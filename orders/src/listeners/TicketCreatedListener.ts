import { Channels, NATSListener, TicketCreatedEvent } from "@app2/common";
import { Message } from "node-nats-streaming";
import { Tickets } from "../models/tickets";
import { QueueGroups } from "@app2/common/dist/natsTools/QueueGroups";

export class TicketCreatedListener extends NATSListener<TicketCreatedEvent> {
  channel = Channels.TICKET_CREATED;
  queueGroupName = QueueGroups.ORDER_GROUP;

  async onMessage(data: TicketCreatedEvent, msg: Message) {
    // console.log('Ticket created');
    // console.log(data);

    await Tickets.create({
      _id: data.id,
      title: data.title,
      price: data.price,  
      userId: data.userId,
    });
    
    msg.ack();
  }
}