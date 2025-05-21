import { ForbiddenException, NoEnityWithIdException } from '@app2/common/exceptions';
import { AsyncHandler } from '@app2/common/types';
import { Channels, EventBusClient } from '@app2/service-utils/eventbus';
import { TicketUpdatedEvent } from '@app2/service-utils/eventbus/events';
import { TicketRepository } from '@components/repository/TicketRepository';
import { UpdateTicketDTO } from './UpdateTicketDTO';
import { UpdateTicketResponse } from './UpdateTicketResponse';

export class UpdateTicketHandler implements AsyncHandler<UpdateTicketDTO, UpdateTicketResponse> {
  constructor (
    private readonly ticketRespository: TicketRepository,
    private readonly eventBus: EventBusClient,
  ) {}
  
  async handle ({ id, title, price }: UpdateTicketDTO): Promise<UpdateTicketResponse> {
    const ticket = await this.ticketRespository.getById(id);

    if (!ticket) {
      throw new NoEnityWithIdException('Ticket');
    }

    if (ticket.orderId) {
      throw new ForbiddenException('Cannot update ordered ticket');
    }

    await this.ticketRespository.update(id, {
      title,
      price,
    });

    console.log(ticket.version);

    await this.eventBus.publish<TicketUpdatedEvent>(Channels.TICKET_UPDATED, {
      id,
      title: title ?? ticket.title,
      price: price ?? ticket.price,
      userId: ticket.userId,
      updatedAt: new Date(),
      version: ++ticket.version,
    });
  }
}