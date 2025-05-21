import { OrderStatus } from '@app2/common/types';
import { mongoosePlugins } from '@app2/common/utils';
import mongoose from "mongoose";
import { v7 } from 'uuid';

export interface OrderDocument extends mongoose.Document {
  id: string;
  publicId: string;
  userId: string;
  price: number;
  status: OrderStatus;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

const orderSchema = new mongoose.Schema<OrderDocument>({
  publicId: {
    type: String,
    default: () => v7(),
  },
  userId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: OrderStatus,
    required: true,
  }
}, {
  id: true,
  timestamps: true,
  versionKey: 'version',
});

orderSchema.plugin(mongoosePlugins.updateVersionIfExists);

export const OrderModel = mongoose.model<OrderDocument>('orders', orderSchema);