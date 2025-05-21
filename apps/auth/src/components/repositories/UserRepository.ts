import { AuthType, Nullable } from '@app2/common/types';
import { User } from '@domain/User';
import { AuthModel } from '@models/AuthModel';
import { UserModel } from '@models/UserModel';
import mongoose from 'mongoose';
import { userMapper } from './userMapper';
import { Auth } from '@domain/Auth';

interface CreateWithAuthUser {
  authType: AuthType;
  email: string;
  name: string;
  sub?: string;
  password?: string;
  pictureUrl?: string;
  email_verified?: boolean
}

export class UserRepository {
  async createWithAuth(data: CreateWithAuthUser): Promise<string> {
    const user = new UserModel({
      name: data.name,
      email: data.email,
      pictureUrl: data.pictureUrl,
    });
    
    const auth = new AuthModel({
      sub: data.sub,
      authType: data.authType,
      password: data.password,
      email_verified: data.email_verified ?? false,
      user: {
        _id: user._id
      }
    });

    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
      await user.save({ session });
      await auth.save({ session });
    });

    return user.publicId;
  }

  async getUserAuth(userId: string): Promise<Auth> {
    const user = await UserModel.findOne({
      publicId: userId,
    });

    if (!user) throw new Error(`User with id ${userId} is not found for auth`);

    const auth = await AuthModel.findOne({
      user: {
        _id: user.id
      }
    });

    if (!auth) throw new Error(`Auth with user id ${userId} is not found`);

    return {
      id: auth.id,
      sub: auth.sub,
      userId,
      password: auth.password,
      authType: auth.authType,
      email_verified: auth.email_verified,
      createdAt: auth.createdAt,
      updatedAt: auth.updatedAt,
    }
  }

  async getById(id: string): Promise<Nullable<User>> {
    const user = await UserModel.findOne({
      publicId: id,
    });

    if (!user) return null;

    return userMapper(user);
  };

  async getByEmail(email: string): Promise<Nullable<User>> {
    const user = await UserModel.findOne({
      email,
    });

    if (!user) return null;
    return userMapper(user);
  }
}