import { AuthType } from '@app2/common/types';

export interface Auth {
  id: string;
  sub?: string,
  userId: string;
  password?: string,
  authType: AuthType,
  email_verified?: boolean,
  createdAt: Date;
  updatedAt: Date;
}