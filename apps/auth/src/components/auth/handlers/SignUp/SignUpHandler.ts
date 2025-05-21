import { SignUpDTO } from '@app2/common/dtos';
import { AlreadyExistsException } from '@app2/common/exceptions';
import { AsyncHandler, AuthType } from '@app2/common/types';
import { UserRepository } from '@components/repositories/UserRepository';
import config from '@config/index';
import { Encryptor } from '@security/encryptor';
import { Hasher } from '@security/hasher';
import { SignUpResponse } from './SignUpResponse';

export class SignUpHandler implements AsyncHandler<SignUpDTO, SignUpResponse> {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly encryptor: Encryptor,
    private readonly hasher: Hasher,
  ) {}

  async handle({ email, name, password, pictureUrl, }: SignUpDTO): Promise<SignUpResponse> {
    const user = await this.userRepository.getByEmail(email);

    if (user) {
      throw new AlreadyExistsException('User');
    }
    
    const hashPassword = await this.hasher.toHash(password);
    
    const userId = await this.userRepository.createWithAuth({
      name,
      email,
      password: hashPassword,
      pictureUrl,
      authType: AuthType.BASIC,
      email_verified: false,
    });

    const token = await this.encryptor.encrypt(
      {
        id: userId,
      },
      config.JWT_SECRET!,
    );

    return {
      id: userId,
      access_token: token,
    };
  }
}