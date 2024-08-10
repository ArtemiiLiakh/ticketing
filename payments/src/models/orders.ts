import { mongoosePlugins, OrderStatus } from "@app2/common";
import mongoose from "mongoose";

export interface OrderAttrs {
  userId: string;
  price: number;
  status: OrderStatus;
}

export interface OrderDocument extends mongoose.Document, OrderAttrs {
  id: string;
  version: number;
}

interface OrderModel extends mongoose.Model<OrderDocument> {
  build(attrs: OrderAttrs): OrderDocument;
  findByIdAndVersion(id: string, version: number): OrderDocument;
}

const orderSchema = new mongoose.Schema<OrderDocument, OrderModel>({
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

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Orders(attrs);
}

orderSchema.statics.findByIdAndVersion = (id: string, version: number) => {
  return Orders.findOne({
    _id: id,
    version,
  });
};

orderSchema.plugin(mongoosePlugins.updateVersionIfExists);

export const Orders = mongoose.model<OrderDocument, OrderModel>('orders', orderSchema);