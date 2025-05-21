import mongoose from 'mongoose';
import { v7 } from 'uuid';

export interface UserDocument extends mongoose.Document {
  id: string;
  publicId: string;
  name: string;
  email: string;
  pictureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>({
  publicId: {
    type: String,
    default: () => v7(),
    searchIndex: true,
  },
  name: String,
  email: { 
    type: String,
    required: true, 
    index: true,
  },
  pictureUrl: {
    type: String,
    required: false,
  },
}, {
  id: true,
  timestamps: true,
});

export const UserModel = mongoose.model<UserDocument>('user', userSchema);