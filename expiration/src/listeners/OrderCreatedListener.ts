import { Channels, NATSListener, OrderCreatedEvent } from "@app2/common";
import { QueueGroups } from "@app2/common/dist/natsTools/QueueGroups";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../bull-queues/expiration-queue";

export class OrderCreatedListener extends NATSListener<OrderCreatedEvent> {
  channel = Channels.ORDER_CREATED;
  queueGroupName = QueueGroups.EXPIRATION_GROUP;

  async onMessage(data: OrderCreatedEvent, msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - Date.now();

    console.log('create data id:', data.id)
    await expirationQueue.add({
      orderId: data.id,
    }, {
      jobId: data.id,
      delay,
    });

    msg.ack();
  }
}