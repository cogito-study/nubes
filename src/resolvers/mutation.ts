import { mutationType } from '@prisma/nexus';
import { Stream } from 'stream';
import { v4 as uuid } from 'uuid';
import { Storage } from '@google-cloud/storage';
import { ImageUploadInput } from './input';

export const Mutation = mutationType({
  definition: (t) => {
    t.field('uploadImage', {
      type: 'String',
      args: {
        data: ImageUploadInput.asArg({ required: true }),
      },
      resolve: async (parent, { data: { file, extension } }) => {
        const base64EncodedImageString = file.replace(/^data:image\/\w+;base64,/, '');

        const bufferStream = new Stream.PassThrough();
        bufferStream.end(Buffer.from(base64EncodedImageString, 'base64'));

        const storage = new Storage({
          projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
        });

        const googleCloudBucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);
        const fileName = `${uuid()}.${extension}`;
        const uploadedFile = googleCloudBucket.file(fileName);

        return new Promise<string>((resolve, reject) => {
          bufferStream
            .pipe(uploadedFile.createWriteStream())
            .on('error', (err) => {
              reject(err); // TODO: Error handling
            })
            .on('finish', () =>
              resolve(`https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${fileName}`),
            );
        });
      },
    });
  },
});
