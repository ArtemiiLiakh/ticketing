import { Channels, EventBusClient, EventBusListener, QueueGroups } from '@app2/service-utils/eventbus';
import { OrderCancelledEvent, TicketUpdatedEvent } from '@app2/service-utils/eventbus/events';
import { TicketRepository } from '@components/repository/TicketRepository';
import { Message } from "node-nats-streaming";

export class OrderCancelledListener extends EventBusListener<OrderCancelledEvent> {
  channel = Channels.ORDER_CANCELLED;
  queueGroup = QueueGroups.TICKET_GROUP;

  constructor (
    private readonly ticketRepository: TicketRepository,
    private readonly client: EventBusClient,
  ) { super() }

  async onMessage({ ticket }: OrderCancelledEvent, msg: Message): Promise<void> {
    const currentTicket = await this.ticketRepository.getById(ticket.id);

    if (!currentTicket) {
      throw new Error('Ticket not found');
    }

    await this.ticketRepository.clearOrderId(ticket.id);

    await this.client.publish<TicketUpdatedEvent>(Channels.TICKET_UPDATED, {
      id: ticket.id,
      title: currentTicket.title,
      price: currentTicket.price,
      userId: currentTicket.userId,
      orderId: '',
      version: ++currentTicket.version,
      updatedAt: new Date(),
    });

    msg.ack();
  }
}