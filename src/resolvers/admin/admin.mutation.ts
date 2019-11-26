import { User } from '@generated/photon';
import { extendType } from 'nexus';
import { EmailTemplateType, sendEmail } from '../../utils/email';
import { generateToken } from '../../utils/token';
import { WhereUniqueInput } from '../input';
import {
  CreateDepartmentInput,
  CreateSubjectInput,
  CreateUserInput,
  SendActivationEmailsInput,
  UpdateUserInput,
} from './admin.input';

export const AdminMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createDepartment', {
      type: 'Department',
      args: { data: CreateDepartmentInput.asArg({ required: true }) },
      resolve: (_, { data: { institute, leader, ...rest } }, ctx) => {
        return ctx.photon.departments.create({
          data: {
            leader: { connect: leader },
            institute: { connect: institute },
            ...rest,
          },
        });
      },
    });

    t.field('createSubject', {
      type: 'Subject',
      args: { data: CreateSubjectInput.asArg({ required: true }) },
      resolve: (_, { data: { department, language, ...rest } }, ctx) => {
        return ctx.photon.subjects.create({
          data: {
            department: { connect: department },
            language: { connect: language },
            ...rest,
          },
        });
      },
    });

    t.field('createUser', {
      type: 'User',
      args: { data: CreateUserInput.asArg({ required: true }) },
      resolve: async (_, { data: { ...rest } }, ctx) => {
        const role = await ctx.photon.userRoles.findMany({ where: { type: rest.role } });

        const user = await ctx.photon.users.create({
          data: {
            ...rest,
            password: 'password',
            role: { connect: { id: role[0].id } },
          },
        });
        return user;
      },
    });

    t.field('updateUser', {
      type: 'User',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateUserInput.asArg({ required: true }),
      },
      resolve: async (_, { where, data: { studiedSubjects, ...rest } }, ctx) => {
        const studiedSubjectsConnect = studiedSubjects.map((studiedSubjectID) => {
          return {
            id: studiedSubjectID,
          };
        });
        const user = await ctx.photon.users.update({
          where,
          data: {
            ...rest,
            studiedSubjects: {
              connect: studiedSubjectsConnect,
            },
          },
        });
        return user;
      },
    });

    t.field('sendActivationEmails', {
      type: 'User',
      list: true,
      args: { data: SendActivationEmailsInput.asArg({ required: true }) },
      resolve: async (_, { data: { ids } }, ctx) => {
        const users = Array<User>();
        ids.forEach(async (id: string) => {
          const token = generateToken();
          const user = await ctx.photon.users.findOne({ where: { id }, include: { role: true } });
          users.push(user);
          const activationToken = await ctx.photon.activationTokens.create({
            data: { token, user: { connect: { id } } },
          });
          sendEmail(
            [{ email: user.email }],
            ['Welcome'],
            {
              link: `${process.env.MINERVA_URL}/register?token=${token}&id=${user.id}`,
              token: activationToken.token,
              name: user.firstName,
            },
            user.role.name == 'USER'
              ? EmailTemplateType.StudentRegistration
              : EmailTemplateType.ProfessorRegistration,
          );
        });
        return users;
      },
    });
  },
});
