import { OrderStatus, mongoosePlugins } from "@app2/common";
import mongoose from "mongoose";
import { TicketDocument } from "./tickets";

interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDocument;
}

export interface OrderDocument extends mongoose.Document, OrderAttrs {
  id: string;
  createdAt: mongoose.Schema.Types.Date;
  updatedAt: mongoose.Schema.Types.Date;
  version: number;
}

interface OrderModel extends mongoose.Model<OrderDocument> {
  build({ userId, status, expiresAt }: OrderAttrs): OrderDocument;
}

const orderSchema = new mongoose.Schema<OrderDocument, OrderModel>({
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  },
  expiresAt: {
    type: mongoose.Schema.Types.Date,
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tickets'
  },
}, {
  id: true,
  timestamps: true,
});

orderSchema.statics.build = ((attrs: OrderAttrs) => {
  return new Orders(attrs);
});

orderSchema.set('versionKey', 'version');
orderSchema.plugin(mongoosePlugins.updateVersionIfExists);
const Orders = mongoose.model<OrderDocument, OrderModel>('orders', orderSchema);

export { Orders };
