import { inputObjectType } from 'nexus';

export const ImageUploadInput = inputObjectType({
  name: 'ImageUploadInput',
  description: 'Input of image upload',
  definition(t) {
    t.string('file', { required: true });
    t.string('extension', { required: true });
  },
});
