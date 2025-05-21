import { IUnitOfWork } from '@app2/service-utils/unitOfWork';
import { OrderRepository } from './OrderRepository';
import { PaymentRepository } from './PaymentRepository';
import mongoose from 'mongoose';

export type UnitRepositories = {
  paymentRepository: PaymentRepository, 
  orderRepository: OrderRepository,
};

export class UnitOfWork implements IUnitOfWork<UnitRepositories> {
  constructor (
    private readonly paymentRepositoryFactory: () => PaymentRepository,
    private readonly orderRepositoryFactory: () => OrderRepository,
  ) {}

  async execute<TReturn>(
    fn: (unit: UnitRepositories) => TReturn,
  ): Promise<TReturn> {
    const session = await mongoose.startSession();
    
    const unit: UnitRepositories = {
      paymentRepository: this.paymentRepositoryFactory(),
      orderRepository: this.orderRepositoryFactory(),
    };

    for (const repository of Object.values(unit)) {
      repository.setSession(session);
    }

    try {
      const result = fn(unit);
      return result;
    } catch (err) {
      await session.abortTransaction();
      console.log(`Error happened in unit of work ${err}`);
      
      throw err; 
    }
  }
}