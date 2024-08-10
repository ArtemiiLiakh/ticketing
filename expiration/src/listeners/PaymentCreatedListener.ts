import { Channels, NATSListener, PaymentCreatedEvent } from "@app2/common";
import { QueueGroups } from "@app2/common/dist/natsTools/QueueGroups";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../bull-queues/expiration-queue";

export class PaymentCreatedListener extends NATSListener<PaymentCreatedEvent> {
  channel = Channels.PAYMENT_CREATED;
  queueGroupName = QueueGroups.EXPIRATION_GROUP;
  async onMessage(data: PaymentCreatedEvent, msg: Message) {
    console.log('remove data id:', data.orderId);
    await expirationQueue.removeJobs(data.orderId);
    msg.ack();
  }
}