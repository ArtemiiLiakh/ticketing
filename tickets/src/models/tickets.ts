import { mongoosePlugins } from '@app2/common';
import mongoose from 'mongoose';

interface TicketAttrs {
  userId: string;
  title: string;
  price: number;
  orderId?: string;
}

interface TicketDocument extends mongoose.Document, TicketAttrs {
  id: string;
  createdAt: mongoose.Schema.Types.Date;
  updatedAt: mongoose.Schema.Types.Date;
  version: number;
}

interface TicketModel extends mongoose.Model<TicketDocument> {
  build ({ userId, title, price }: TicketAttrs): TicketDocument;
}

const ticketSchema = new mongoose.Schema<TicketDocument, TicketModel>({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  orderId: {
    type: String,
  },
}, {
  id: true,
  timestamps: true,
});

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Tickets(attrs);
};

ticketSchema.plugin(mongoosePlugins.updateVersionIfExists);
ticketSchema.set('versionKey', 'version');
const Tickets = mongoose.model<TicketDocument, TicketModel>('ticket', ticketSchema);

export { Tickets };