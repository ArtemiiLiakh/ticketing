import mongoose from "mongoose";

export interface PaymentsDocument extends mongoose.Document {
  orderId: string;
  stripeId: string;
  price: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

const paymentSchema = new mongoose.Schema<PaymentsDocument>({
  orderId: {
    type: String,
    required: true,
    index: true,
  },
  stripeId: {
    type: String,
    required: true,
    index: true,
  },  
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: 'version'
});


export const PaymentModel = mongoose.model<PaymentsDocument>('payments', paymentSchema);