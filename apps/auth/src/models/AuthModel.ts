import { AuthType } from '@app2/common/types';
import mongoose from 'mongoose';
import { UserDocument } from './UserModel';

export interface AuthDocument extends mongoose.Document {
  id: string;
  user: UserDocument,
  sub?: string,
  password?: string,
  authType: AuthType,
  email_verified?: boolean,
  createdAt: Date;
  updatedAt: Date;
}

const authSchema = new mongoose.Schema<AuthDocument>({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user',
  }, 
  sub: {
    type: String,
    reqruired: false,
    index: true,
  },
  password: {
    type: String,
    required: false,
  },
  authType: {
    type: String,
    enum: AuthType,
  },
  email_verified: {
    type: Boolean,
    default: false,
  }
}, {
  id: true,
  timestamps: true,
});

export const AuthModel = mongoose.model<AuthDocument>('auth', authSchema);