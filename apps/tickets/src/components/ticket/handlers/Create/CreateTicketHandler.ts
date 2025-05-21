import { AsyncHandler } from '@app2/common/types';
import { Channels, EventBusClient } from '@app2/service-utils/eventbus';
import { TicketCreatedEvent } from '@app2/service-utils/eventbus/events';
import { TicketRepository } from '@components/repository/TicketRepository';
import { CreateTicketDTO } from './CreateTicketDTO';
import { CreateTicketResponse } from './CreateTicketResponse';

export class CreateTicketHandler implements AsyncHandler<CreateTicketDTO, CreateTicketResponse> {
  constructor (
    private readonly ticketRepository: TicketRepository,
    private readonly eventBusClient: EventBusClient,
  ) {}

  async handle (dto: CreateTicketDTO): Promise<CreateTicketResponse> {
    const ticket = await this.ticketRepository.create({
      userId: dto.ownerId,
      title: dto.title,
      price: dto.price,
    });
    
    await this.eventBusClient.publish<TicketCreatedEvent>(Channels.TICKET_CREATED, {
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    return {
      id: ticket.id,
    };
  }
};