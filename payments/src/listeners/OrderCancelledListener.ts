import { Channels, NATSListener, OrderCancelledEvent, OrderStatus } from "@app2/common";
import { QueueGroups } from "@app2/common/dist/natsTools/QueueGroups";
import { Message } from "node-nats-streaming";
import { Orders } from "../models/orders";

export class OrderCancelledListener extends NATSListener<OrderCancelledEvent> {
  channel = Channels.ORDER_CANCELLED;
  queueGroupName = QueueGroups.PAYMENT_GROUP;
  
  async onMessage(data: OrderCancelledEvent, msg: Message) {
    const orders = await Orders.findByIdAndVersion(data.id, data.version-1);
    
    if (!orders) {
      throw new Error('Order not found');
    }

    orders.set({
      status: OrderStatus.CANCELLED,
    });

    await orders.save();
    msg.ack();
  }
}