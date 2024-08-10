import { Channels, NATSListener, OrderCreatedEvent } from "@app2/common";
import { QueueGroups } from "@app2/common/dist/natsTools/QueueGroups";
import { Message } from "node-nats-streaming";
import { Orders } from "../models/orders";

export class OrderCreatedListener extends NATSListener<OrderCreatedEvent> {
  channel = Channels.ORDER_CREATED;
  queueGroupName = QueueGroups.PAYMENT_GROUP;
  
  async onMessage(data: OrderCreatedEvent, msg: Message) {
    await Orders.create({
      _id: data.id,
      userId: data.userId,
      price: data.ticket.price,
      status: data.status,
      version: data.version,
    });

    msg.ack();
  }
}