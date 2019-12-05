import { ApolloError } from 'apollo-server';
import { OptionsWithUrl, post } from 'request';
import { Environment } from './environment';

const randomFounder = () => ['Máté', 'Ádám', 'Kristóf'][Math.floor(Math.random() * 3)];

export enum EmailTemplateType {
  ProfessorInviteActivation = 9,
  StudentInviteActivation = 5,
  // TODO: Use only one forgot password template
  ProfessorForgotPassword = 10,
  StudentForgotPassword = 3,
  // TODO: Create register templates in SIB
  RegisterActivation = 9,
}

type SendEmailOptions = {
  to: { email: string; name: string };
  tags: string[];
  params: { link: string };
  template: EmailTemplateType;
};

export const sendEmail = ({ to, tags, params, template }: SendEmailOptions) => {
  const sender = {
    email: 'welcome@cogito.study',
    name: `${randomFounder()} from Cogito`,
  };
  const options: OptionsWithUrl = {
    method: 'POST',
    url: 'https://api.sendinblue.com/v3/smtp/email',
    headers: {
      'Content-Type': 'application/json',
      'api-key': Environment.sendInBlueKey,
    },
    body: {
      tags,
      sender,
      to,
      replyTo: { email: 'support@cogito.study' },
      params,
      template,
    },
    json: true,
  };

  post(options, (error) => {
    if (error) throw new ApolloError(error);
  });
};
