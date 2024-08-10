import mongoose from 'mongoose';

export interface UserAttrs {
  email: string;
  password: string;
}

export interface UserDocument extends mongoose.Document, UserAttrs {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserModel extends mongoose.Model<UserDocument> {
  build: ({ email, password }: UserAttrs) => UserDocument;
}

const userSchema = new mongoose.Schema<UserDocument, UserModel>({
  email: { 
    type: String,
    required: true, 
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  id: true,
  timestamps: true,
});

userSchema.statics.build = ({ email, password }: UserAttrs) => {
  return new User({ email, password });
};

const User = mongoose.model<UserDocument, UserModel>('user', userSchema);
export { User };