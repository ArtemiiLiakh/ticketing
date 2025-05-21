import { Nullable } from '@app2/common/types';
import { TransactionalRepository } from '@app2/service-utils/unitOfWork';
import { Payment } from '@domain/Payment';
import { PaymentModel } from '@models/PaymentModel';
import { ClientSession } from 'mongoose';
import { paymentMapper } from './paymentMapper';

interface CreatePayment {
  orderId: string
  stripeId: string
  price: number
  currency: string
}

export class PaymentRepository implements TransactionalRepository<ClientSession> {
  private session: ClientSession | undefined;

  async getByOrder (orderId: string): Promise<Nullable<Payment>> {
    const payment = await PaymentModel.findOne({
      orderId,
    }, {}, { 
      session: this.session,
    });

    if (!payment) return null;

    return paymentMapper(payment);
  }

  async create (data: CreatePayment): Promise<void> {
    await PaymentModel.create([{
      orderId: data.orderId,
      stripeId: data.stripeId,
      price: data.price,
      currency: data.currency,
    }], { session: this.session });
  }

  setSession(session: ClientSession): void {
    this.session = session;
  } 
}