import { LanguageCode } from '@prisma/photon';
import { ApolloError } from 'apollo-server';
import { __ } from 'i18n';
import { OptionsWithUrl, post } from 'request';
import { Environment } from './environment';

const randomFounder = () => ['Máté', 'Ádám', 'Kristóf'][Math.floor(Math.random() * 3)];

export type EmailTemplateType =
  | 'ChangePassword'
  | 'ChangeEmail'
  | 'ForgotPassword'
  | 'RegisterActivation';

export type LocalizedEmailTemplateType = Record<EmailTemplateType, Record<LanguageCode, number>>;

export const emailTemplates: LocalizedEmailTemplateType = {
  ChangePassword: { hu: 11, en: 15 },
  ChangeEmail: { hu: 14, en: 13 },
  ForgotPassword: { hu: 16, en: 12 },
  RegisterActivation: { hu: 17, en: 18 },
};

type SendEmailOptions = {
  to: string;
  params: { link: string; firstName: string; lastName: string; newEmail?: string };
  template: EmailTemplateType;
  preferredLanguage: LanguageCode;
};

type SendEmailByIDOptions = {
  to: string;
  params: { link: string; firstName: string; lastName: string };
  templateID: number;
};

export const sendEmailByID = ({ to, params, templateID }: SendEmailByIDOptions) => {
  const sender = {
    email: 'welcome@cogito.study',
    name: __('sender_name', { name: randomFounder() }),
  };

  const options: OptionsWithUrl = {
    method: 'POST',
    url: `https://api.sendinblue.com/v3/smtp/email`,
    headers: {
      'Content-Type': 'application/json',
      'api-key': Environment.sendInBlueKey,
    },
    body: {
      sender,
      to: [{ email: to }],
      replyTo: { email: 'support@cogito.study' },
      templateId: templateID,
      params,
    },
    json: true,
  };
  post(options, (error) => {
    if (error) throw new ApolloError(error);
  });
};

export const sendEmail = ({ to, params, template, preferredLanguage }: SendEmailOptions) => {
  const templateID = emailTemplates[template][preferredLanguage];
  sendEmailByID({ to, params, templateID });
};
