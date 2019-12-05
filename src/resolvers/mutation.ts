import { Storage } from '@google-cloud/storage';
import { mutationType } from 'nexus';
import { Stream } from 'stream';
import { v4 as uuid } from 'uuid';
import { Environment } from '../utils/environment';
import { ImageUploadInput } from './input';

export const Mutation = mutationType({
  definition: (t) => {
    t.field('uploadImage', {
      type: 'String',
      args: {
        data: ImageUploadInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { file, extension } }) => {
        const base64EncodedImageString = file.replace(/^data:image\/\w+;base64,/, '');

        const bufferStream = new Stream.PassThrough();
        bufferStream.end(Buffer.from(base64EncodedImageString, 'base64'));

        const storage = new Storage({ projectId: Environment.googleCloud.projectID });
        const googleCloudBucket = storage.bucket(Environment.googleCloud.bucketName);
        const fileName = `${uuid()}.${extension}`;
        const uploadedFile = googleCloudBucket.file(fileName);

        return new Promise<string>((resolve, reject) => {
          bufferStream
            .pipe(uploadedFile.createWriteStream())
            .on('error', (err) => {
              reject(err); // TODO: Error handling
            })
            .on('finish', () => resolve(Environment.googleCloud.fileURL(fileName)));
        });
      },
    });
  },
});
