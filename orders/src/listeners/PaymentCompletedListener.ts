import { Channels, NATSListener, OrderStatus, PaymentCompletedEvent } from "@app2/common";
import { QueueGroups } from "@app2/common/dist/natsTools/QueueGroups";
import { Message } from "node-nats-streaming";
import { Orders } from "../models/orders";

export class PaymentCompletedListener extends NATSListener<PaymentCompletedEvent> {
  channel = Channels.PAYMENT_CONFIRMED;
  queueGroupName = QueueGroups.ORDER_GROUP;

  async onMessage(data: PaymentCompletedEvent, msg: Message) {
    const order = await Orders.findById(data.orderId);
    
    if (!order) {
      throw new Error(`Order with id '${data.orderId}' not found`);
    }

    order.set({
      status: OrderStatus.COMPLETE,
    });

    await order.save();
    
    msg.ack();
  }
}