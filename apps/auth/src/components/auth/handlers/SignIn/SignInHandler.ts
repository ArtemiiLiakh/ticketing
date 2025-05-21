import { BadBodyException, UnauthorizedException } from '@app2/common/exceptions';
import { AsyncHandler, AuthType } from '@app2/common/types';
import { UserRepository } from '@components/repositories/UserRepository';
import config from '@config/index';
import { Encryptor } from '@security/encryptor';
import { Hasher } from '@security/hasher';
import { SignInDTO } from './SignInDTO';
import { SignInResponse } from './SignInResponse';

export class SignInHandler implements AsyncHandler<SignInDTO, SignInResponse> {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly jwtEncryptor: Encryptor,
    private readonly hasher: Hasher,
  ) {}
  
  async handle ({ email, password }: SignInDTO): Promise<SignInResponse> {
     const user = await this.userRepository.getByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException();
    }

    const authInfo = await this.userRepository.getUserAuth(user.id);
    
    if (authInfo?.authType !== AuthType.BASIC) {
      throw new UnauthorizedException();
    }

    if (!(await this.hasher.compare(password, authInfo.password!))) {
      throw new BadBodyException();
    }

    const token = await this.jwtEncryptor.encrypt(
      {
        id: user.id,
        email: user.email,
      },
      config.JWT_SECRET!,
    );

    return {
      id: user.id,
      access_token: token,
    };
  }
}