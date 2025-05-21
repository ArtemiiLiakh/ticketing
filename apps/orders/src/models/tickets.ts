import { mongoosePlugins } from '@app2/common/utils';
import mongoose from "mongoose";

export interface TicketDocument extends mongoose.Document {
  id: string;
  publicId: string;
  title: string;
  price: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

const ticketSchema = new mongoose.Schema<TicketDocument>({
  publicId: {
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
  userId: {
    type: String,
    required: true,
  },
}, {
  id: true,
  timestamps: true,
  versionKey: 'version',
});

ticketSchema.plugin(mongoosePlugins.updateVersionIfExists);
const TicketModel = mongoose.model<TicketDocument>('tickets', ticketSchema);

export { TicketModel };
