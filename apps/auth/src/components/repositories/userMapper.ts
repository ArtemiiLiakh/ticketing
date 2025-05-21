import { User } from '@domain/User';
import { UserDocument } from '@models/UserModel';

export const userMapper = (user: UserDocument): User => ({
  id: user.publicId,
  name: user.name,
  email: user.email,
  pictureUrl: user.pictureUrl,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});