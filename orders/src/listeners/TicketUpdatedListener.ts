import { Channels, NATSListener, TicketUpdatedEvent } from "@app2/common";
import { Message } from "node-nats-streaming";
import { Tickets } from "../models/tickets";
import { QueueGroups } from "@app2/common/dist/natsTools/QueueGroups";

export class TicketUpdatedListener extends NATSListener<TicketUpdatedEvent> {
  channel = Channels.TICKET_UPDATED;
  queueGroupName = QueueGroups.ORDER_GROUP;

  async onMessage(data: TicketUpdatedEvent, msg: Message) { 
    const ticket = await Tickets.findOne({
      _id: data.id,
      version: data.version-1,
    });

    if (!ticket) {
      throw new Error('ticket not found');
    }

    ticket.set({
      title: data.title,
      price: data.price,
      userId: data.userId,
    }); 

    await ticket.save();
    msg.ack();
  }
}