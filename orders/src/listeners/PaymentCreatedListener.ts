import { Channels, NATSListener, OrderStatus, PaymentCreatedEvent } from "@app2/common";
import { QueueGroups } from "@app2/common/dist/natsTools/QueueGroups";
import { Message } from "node-nats-streaming";
import { Orders } from "../models/orders";

export class PaymentCreatedListener extends NATSListener<PaymentCreatedEvent> {
  channel = Channels.PAYMENT_CREATED;
  queueGroupName = QueueGroups.ORDER_GROUP;

  async onMessage(data: PaymentCreatedEvent, msg: Message) {
    const order = await Orders.findById(data.orderId);
    
    if (!order) {
      throw new Error(`Order with id '${data.orderId}' not found`);
    }

    order.set({
      status: OrderStatus.PENDING,
    });

    await order.save();
    
    msg.ack();
  }
}