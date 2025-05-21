import { Channels, EventBusListener, EventMessage, QueueGroups } from '@app2/service-utils/eventbus';
import { TicketCreatedEvent } from '@app2/service-utils/eventbus/events';
import { TicketRepository } from '@components/repositories/TicketRepository';

export class TicketCreatedListener extends EventBusListener<TicketCreatedEvent> {
  channel = Channels.TICKET_CREATED;
  queueGroup = QueueGroups.ORDER_GROUP;

  constructor (
    private readonly ticketRepository: TicketRepository,
  ) { super() }

  async onMessage(data: TicketCreatedEvent, msg: EventMessage): Promise<void> {
    await this.ticketRepository.create({
      id: data.id,
      title: data.title,
      price: data.price,  
      userId: data.userId,
    });

    msg.ack();
  }
}