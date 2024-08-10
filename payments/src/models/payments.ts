import mongoose from "mongoose";

export interface PaymentsAttrs {
  orderId: string;
  stripeId: string;
  amount: number;
  currency: string;
}

export interface PaymentsDocument extends mongoose.Document, PaymentsAttrs {}

interface PaymentModel extends mongoose.Model<PaymentsDocument> {
  build(attrs: PaymentsAttrs): PaymentsDocument;
}

const paymentSchema = new mongoose.Schema<PaymentsDocument, PaymentModel>({
  orderId: {
    type: String,
    required: true,
  },
  stripeId: {
    type: String,
    required: true,
  },  
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
  },
});

paymentSchema.statics.build = (attrs: PaymentsAttrs) => {
  return new Payments(attrs);
}

export const Payments = mongoose.model<PaymentsDocument, PaymentModel>('payments', paymentSchema);