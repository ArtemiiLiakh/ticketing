import { AsyncHandler } from '@app2/common/types';
import { NoEnityWithIdException } from '@app2/common/exceptions';
import { GetMeDTO } from './GetMeDTO';
import { GetMeResponse } from './GetMeResponse';
import { UserRepository } from '@components/repositories/UserRepository';

export class GetMeHandler implements AsyncHandler<GetMeDTO, GetMeResponse> {
  constructor (
    private userRepository: UserRepository,
  ) {}
  
  async handle({ id }: GetMeDTO): Promise<GetMeResponse> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new NoEnityWithIdException('User');
    }

    return user;
  }
}