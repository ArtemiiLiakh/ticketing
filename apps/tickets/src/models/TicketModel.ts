import { mongoosePlugins } from '@app2/common/utils';
import { v7 } from 'uuid';
import mongoose from 'mongoose';

interface TicketDocument extends mongoose.Document {
  id: string;
  publicId: string;
  userId: string;
  title: string;
  price: number;
  orderId?: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

const ticketSchema = new mongoose.Schema<TicketDocument>({
  publicId: {
    type: String,
    default: () => v7(),
    required: false,
    index: true,
  },
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
  versionKey: 'version',
});

ticketSchema.plugin(mongoosePlugins.updateVersionIfExists);
const TicketModel = mongoose.model<TicketDocument>('ticket', ticketSchema);

export { TicketModel, TicketDocument };
