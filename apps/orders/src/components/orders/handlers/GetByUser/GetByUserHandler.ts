import { AsyncHandler } from '@app2/common/types';
import { GetByUserDTO } from './GetByUserDTO';
import { GetByUserResponse } from './GetByUserResponse';
import { OrderRepository } from '@components/repositories/OrderRepository';

export class GetByUserHandler implements AsyncHandler<GetByUserDTO, GetByUserResponse> {
  constructor (
    private readonly orderRepository: OrderRepository,
  ) {}
  
  async handle({ userId, page, pageSize }: GetByUserDTO): Promise<GetByUserResponse> {
    const orders = await this.orderRepository.getByUser(userId, {
      page,
      pageSize,
    });

    return orders;
  }
}