import { ForbiddenException, NoEnityWithIdException, NotFoundException } from '@app2/common/exceptions';
import { AsyncHandler } from '@app2/common/types';
import { OrderRepository } from '@components/repositories/OrderRepository';
import { TicketRepository } from '@components/repositories/TicketRepository';
import { GetByIdOrderDTO } from './GetByIdOrderDTO';
import { GetByIdOrderResponse } from './GetByIdOrderResponse';

export class GetByIdOrderHandler implements AsyncHandler<GetByIdOrderDTO, GetByIdOrderResponse> {
  constructor (
    private readonly orderRepository: OrderRepository,
    private readonly ticketRepository: TicketRepository,
  ) {}
  
  async handle({ id, exeutorId }: GetByIdOrderDTO): Promise<GetByIdOrderResponse> {
    const order = await this.orderRepository.getById(id);
    
    if (!order) throw new NoEnityWithIdException('Order');
    if (order.userId !== exeutorId) throw new ForbiddenException('You cannot review other\'s orders');
    
    const ticket = await this.ticketRepository.getById(order.ticketId);
    if (!ticket) throw new NotFoundException('Ticket for that order was not found');

    return {
      order,
      ticket,
    };
  }
}