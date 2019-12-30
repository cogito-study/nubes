import { config } from 'dotenv';
import { resolve } from 'path';

const path = resolve(__dirname, '../../.env');
config({ path });

const nodeEnv = process.env.NODE_ENV;
const claraURL = process.env.MINERVA_URL;
const secret = process.env.APP_SECRET;
const sendInBlueKey = process.env.SIB_API_KEY;
const sentryDSN = process.env.SENTRY_DSN;
const googleCloud = {
  projectID: process.env.GOOGLE_CLOUD_PROJECT_ID,
  bucketName: process.env.GOOGLE_CLOUD_BUCKET_NAME,
  fileURL: (fileName: string) =>
    `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${fileName}`,
};

const activateInvitationLink = (token: string) => `${claraURL}/activate-invitation?token=${token}`;
const activateRegistrationLink = (token: string) =>
  `${claraURL}/activate-registration?token=${token}`;
const resetPasswordLink = (token: string) => `${claraURL}/reset-password?token=${token}`;

export const Environment = {
  nodeEnv,
  claraURL,
  sentryDSN,
  sendInBlueKey,
  secret,
  googleCloud,
  activateInvitationLink,
  activateRegistrationLink,
  resetPasswordLink,
};
