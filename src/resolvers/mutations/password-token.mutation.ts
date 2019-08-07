import { extendType } from '@prisma/nexus';

export const PasswordTokenMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOnePasswordToken();
    t.crud.updateOnePasswordToken();
    t.crud.deleteOnePasswordToken();
  },
});
