import mongoose from "mongoose";
import { OrderStatus, mongoosePlugins } from "@app2/common";
import { Orders } from "./orders";

export interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

export interface TicketDocument extends mongoose.Document, TicketAttrs {
  id: string;
  createdAt: mongoose.Schema.Types.Date;
  updatedAt: mongoose.Schema.Types.Date;
  version: number;
  isReserved: () => Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDocument> {
  build(attrs: TicketAttrs): TicketDocument;
}

const ticketSchema = new mongoose.Schema<TicketDocument, TicketModel>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  userId: {
    type: String,
    required: true,
  },
}, {
  id: true,
  timestamps: true,
});

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Tickets(attrs);
};

ticketSchema.methods.isReserved = async function () {
  const order = await Orders.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.CREATED, OrderStatus.PENDING, OrderStatus.COMPLETE,
      ],
    },
  });

  return !!order;
}

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(mongoosePlugins.updateVersionIfExists);
const Tickets = mongoose.model<TicketDocument, TicketModel>('tickets', ticketSchema);

export { Tickets };