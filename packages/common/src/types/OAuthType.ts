import { ValueOf } from '../utils/ValueOf';

export const OAuthType = {
  GOOGLE: 'google',
  GITHUB: 'github',
  OKTA: 'okta',
} as const;

export type OAuthType = ValueOf<typeof OAuthType>;