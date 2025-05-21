import { Channels, EventBusListener, EventMessage, QueueGroups } from '@app2/service-utils/eventbus';
import { TicketUpdatedEvent } from '@app2/service-utils/eventbus/events';
import { TicketRepository } from '@components/repositories/TicketRepository';

export class TicketUpdatedListener extends EventBusListener<TicketUpdatedEvent> {
  channel = Channels.TICKET_UPDATED;
  queueGroup = QueueGroups.ORDER_GROUP;

  constructor (
    private readonly ticketRepository: TicketRepository,
  ) { super() }

  async onMessage({ id, ...data }: TicketUpdatedEvent, msg: EventMessage): Promise<void> { 
    const ticket = await this.ticketRepository.getById(id);

    if (!ticket) {
      throw new Error('ticket not found');
    }

    if (ticket.version !== data.version-1) {
      throw new Error('Ticket versions are different');
    }

    await this.ticketRepository.update(id, {
      userId: data.userId,
      title: data.title,
      price: data.price,
      updatedAt: data.updatedAt,
    });

    msg.ack();
  }
}