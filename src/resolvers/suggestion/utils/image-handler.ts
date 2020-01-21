import { Storage } from '@google-cloud/storage';
import { ApolloError } from 'apollo-server';
import { __ } from 'i18n';
import Delta from 'quill-delta';
import request from 'request-promise';
import { Stream } from 'stream';
import uuid from 'uuid';
import { Environment } from './../../../utils/environment';

const uploadImage = async (base64String: string): Promise<string> => {
  const base64EncodedImageString = base64String.replace(/^data:image\/\w+;base64,/, '');

  const bufferStream = new Stream.PassThrough();
  bufferStream.end(Buffer.from(base64EncodedImageString, 'base64'));

  const storage = new Storage({
    projectId: Environment.googleCloud.projectID,
  });

  const googleCloudBucket = storage.bucket(Environment.googleCloud.bucketName);
  const fileName = `${uuid()}.jpg`;
  const uploadedFile = googleCloudBucket.file(fileName);

  return new Promise<string>((resolve, reject) => {
    bufferStream
      .pipe(uploadedFile.createWriteStream())
      .on('error', (err) => {
        reject(err); // TODO: Error handling
      })
      .on('finish', () =>
        resolve(`https://storage.googleapis.com/${Environment.googleCloud.bucketName}/${fileName}`),
      );
  });
};

const downloadImage = async (url: string): Promise<string> => {
  const response = await request.get(url);
  const base64Image = Buffer.from(response).toString('base64');
  return `data:${response.headers['content-type']};base64,${base64Image}`;
};

const tryConvertImageToBase64 = async (imageString: string): Promise<string> => {
  if (imageString.startsWith('data:image')) {
    return imageString;
  } else if (imageString.startsWith('http')) {
    try {
      return await downloadImage(imageString);
    } catch (e) {
      console.error(e);
      return imageString;
    }
  } else {
    throw new ApolloError(__('invalid_image_upload'));
  }
};

export const convertDeltaImages = async (deltaToConvert: Delta): Promise<Delta> => {
  const convertedDelta = new Delta(
    await Promise.all(
      deltaToConvert.ops.map(async (op) => {
        if (typeof op?.insert !== 'string' && op?.insert?.hasOwnProperty('image')) {
          // @ts-ignore
          const imageBase64 = await tryConvertImageToBase64(op.insert.image as string);

          const url = await uploadImage(imageBase64);
          //@ts-ignore
          op.insert.image = url;
        }
        return op;
      }),
    ),
  );
  return convertedDelta;
};
