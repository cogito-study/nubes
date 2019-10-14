import { post, Options, UrlOptions } from 'request';
import { ApolloError } from 'apollo-server';

export const randomFounder = () => ['Máté', 'Ádám', 'Kristóf'][Math.floor(Math.random() * 3)];

interface EmailWithName {
  email: string;
  name?: string;
}

export enum EmailTemplateType {
  ProfessorRegistration = 9,
  StudentRegistration = 5,
  ProfessorForgotPassword = 10,
  StudentForgotPassword = 3,
}

export const sendEmail = (
  sender: EmailWithName,
  to: EmailWithName[],
  tags: string[],
  params: object,
  template: EmailTemplateType,
) => {
  const options: UrlOptions & Options = {
    method: 'POST',
    url: 'https://api.sendinblue.com/v3/smtp/email',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.SIB_API_KEY,
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
