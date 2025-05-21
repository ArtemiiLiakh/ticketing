import { Channels, EventBusClient, EventBusListener, QueueGroups } from '@app2/service-utils/eventbus';
import { OrderCreatedEvent, TicketUpdatedEvent } from '@app2/service-utils/eventbus/events';
import { TicketRepository } from '@components/repository/TicketRepository';
import { Message } from "node-nats-streaming";

export class OrderCreatedListener extends EventBusListener<OrderCreatedEvent> {
  channel =  Channels.ORDER_CREATED;
  queueGroup = QueueGroups.TICKET_GROUP;

  constructor (
    private readonly ticketRepository: TicketRepository,
    private readonly client: EventBusClient,
  ) { super() }

  async onMessage(order: OrderCreatedEvent, msg: Message): Promise<void> {
    const ticket = await this.ticketRepository.getById(order.ticket.id);

    if (!ticket) {
      throw new Error('ticket not found');
    }

    await this.ticketRepository.setOrderId(order.ticket.id, order.id);

    await this.client.publish<TicketUpdatedEvent>(Channels.TICKET_UPDATED, {
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ++ticket.version,
      updatedAt: new Date(),
    });

    msg.ack();
  } 
}