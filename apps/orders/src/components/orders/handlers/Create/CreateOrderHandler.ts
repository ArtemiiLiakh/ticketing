import { BadBodyException, NoEnityWithIdException } from '@app2/common/exceptions';
import { AsyncHandler } from '@app2/common/types';
import { Channels, EventBusClient } from '@app2/service-utils/eventbus';
import { OrderCreatedEvent } from '@app2/service-utils/eventbus/events';
import { OrderRepository } from '@components/repositories/OrderRepository';
import { TicketRepository } from '@components/repositories/TicketRepository';
import { ConfigSchema } from '@config';
import { CreateOrderDTO } from './CreateOrderDTO';
import { CreateOrderResponse } from './CreateOrderResponse';

export class CreateOrderHandler implements AsyncHandler<CreateOrderDTO, CreateOrderResponse> {
  constructor (
    private readonly ticketRepository: TicketRepository,
    private readonly orderRepository: OrderRepository,
    private readonly eventBusClient: EventBusClient,
    private readonly config: ConfigSchema,
  ) {}

  async handle({ userId, ticketId, status }: CreateOrderDTO): Promise<CreateOrderResponse> {
    const ticket = await this.ticketRepository.getById(ticketId);
    
    if (!ticket) {
      throw new NoEnityWithIdException('Ticket');
    }

    if (await this.ticketRepository.isReserved(ticketId)) {
      throw new BadBodyException('Ticket with such id is already reserved');
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + this.config.ORDER_EXPIRATION);
  
    const order = await this.orderRepository.create({
      ticketId,
      userId,
      status,
      expiresAt: expiration,
    });

    await this.eventBusClient.publish<OrderCreatedEvent>(
      Channels.ORDER_CREATED, 
      {
        id: order.id,
        userId: order.userId,
        status: order.status,
        expiresAt: expiration,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        ticket: {
          id: ticket.id,
          price: ticket.price,
        },
        version: order.version,
      }
    );

    return { id: order.id };
  }
}