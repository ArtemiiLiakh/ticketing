import { Channels, ExpirationCompleteEvent, natsClient, NATSListener, NATSPublisher, OrderCancelledEvent, OrderStatus } from "@app2/common";
import { QueueGroups } from "@app2/common/dist/natsTools/QueueGroups";
import { Message } from "node-nats-streaming";
import { Orders } from "../models/orders";

export class ExpirationCompleteListener extends NATSListener<ExpirationCompleteEvent> {
  channel = Channels.EXPIRATION_COMPLETED;
  queueGroupName = QueueGroups.ORDER_GROUP;
  
  async onMessage(data: ExpirationCompleteEvent, msg: Message) {
    const order = await Orders.findById(data.orderId).populate('ticket');
    
    if (!order) {
      throw new Error('Order not found');
    }

    order.set({
      status: OrderStatus.CANCELLED,
    });

    await order.save();
    await new NATSPublisher(natsClient.client).publish<OrderCancelledEvent>(Channels.ORDER_CANCELLED, {
      id: order.id,
      ticket: {
        id: order.ticket.id,
      },
      version: order.version,
    });

    msg.ack();
  }
}