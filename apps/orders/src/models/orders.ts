import { OrderStatus } from '@app2/common/types';
import { mongoosePlugins } from '@app2/common/utils';
import mongoose from "mongoose";
import { TicketDocument } from "./tickets";
import { v7 } from 'uuid';

export interface OrderDocument extends mongoose.Document {
  id: string;
  publicId: string;
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDocument;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

const orderSchema = new mongoose.Schema<OrderDocument>({
  userId: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    default: () => v7(),
  },
  status: {
    type: String,
    required: true,
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  },
  expiresAt: {
    type: Date,
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tickets'
  },
}, {
  id: true,
  timestamps: true,
  versionKey: 'version',
});

orderSchema.plugin(mongoosePlugins.updateVersionIfExists);
const OrderModel = mongoose.model<OrderDocument>('orders', orderSchema);

export { OrderModel };
