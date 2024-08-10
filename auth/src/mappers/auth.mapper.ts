import { UserDocument } from '../models/user';

export class AuthMapper {
  getMe (user: UserDocument) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  signUp (user: UserDocument) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  signIn (user: UserDocument) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}