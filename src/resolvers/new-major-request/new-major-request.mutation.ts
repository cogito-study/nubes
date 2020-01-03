import { ApolloError, AuthenticationError } from 'apollo-server';
import { __ } from 'i18n';
import { extendType } from 'nexus';
import { validateActivationToken } from '../../utils/token';
import { CreateNewMajorRequestInput } from './new-major-request.input';

export const NewMajorRequestMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createNewMajorRequest', {
      type: 'NewMajorRequest',
      args: { data: CreateNewMajorRequestInput.asArg({ required: true }) },
      resolve: async (_, { data: { token, ...rest } }, context) => {
        const activationToken = await validateActivationToken({ token, context });
        if (activationToken === null) throw new AuthenticationError(__('invalid_expired_token'));

        const newMajorRequest = await context.photon.newMajorRequests.findMany({
          where: {
            user: { id: activationToken.user.id },
          },
        });
        if (newMajorRequest.length !== 0) throw new ApolloError(__('new_major_reuqest_exist'));

        return context.photon.newMajorRequests.create({
          data: {
            user: { connect: { id: activationToken.user.id } },
            ...rest,
          },
        });
      },
    });
  },
});
