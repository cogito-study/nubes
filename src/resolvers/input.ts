import { inputObjectType } from 'nexus';

export const ImageUploadInput = inputObjectType({
  name: 'ImageUploadInput',
  description: 'Input of image upload',
  definition(t) {
    t.string('file', { required: true });
    t.string('extension', { required: true });
  },
});

export const ConnectRelation = inputObjectType({
  name: 'ConnectRelation',
  definition(t) {
    t.id('id', { required: true });
  },
});

export const WhereUniqueInput = inputObjectType({
  name: 'WhereUniqueInput',
  description: 'Unique input',
  definition(t) {
    t.id('id');
  },
});
