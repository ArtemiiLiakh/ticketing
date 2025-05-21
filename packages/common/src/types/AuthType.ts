import { ValueOf } from '../utils/ValueOf';

export const AuthType = {
  BASIC: 'basic',
  GOOGLE: 'google',
  GITHUB: 'github',
  OKTA: 'okta',
} as const;

export type AuthType = ValueOf<typeof AuthType>;
