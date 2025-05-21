import { BadBodyException, ForbiddenException, NoEnityWithIdException } from '@app2/common/exceptions';
import { AsyncHandler, OrderStatus } from '@app2/common/types';
import { Channels, EventBusClient } from '@app2/service-utils/eventbus';
import { PaymentCreatedEvent } from '@app2/service-utils/eventbus/events';
import { UnitOfWork } from '@components/repositories/UnitOfWork';
import { PaymentService } from '@components/services/PaymentService';
import { CreatePaymentDTO } from './CreatePaymentDTO';
import { CreatePaymentResponse } from './CreatePaymentResponse';

export class CreatePaymentHandler implements AsyncHandler<CreatePaymentDTO, CreatePaymentResponse> {
  constructor (
    private readonly paymentService: PaymentService,
    private readonly unitOfWork: UnitOfWork,
    private readonly eventBusClient: EventBusClient,
  ) {}

  async handle({ orderId, executorId, payment_method_types, idempotencyKey }: CreatePaymentDTO): Promise<CreatePaymentResponse> {
    return this.unitOfWork.execute(async (unit): Promise<CreatePaymentResponse> => {
      const order = await unit.orderRepository.getById(orderId);
      
      if (!order) {
        throw new NoEnityWithIdException('Order');
      }

      if (order.userId !== executorId) {
        throw new ForbiddenException();
      }

      if (order.status === OrderStatus.CANCELLED) {
        throw new BadBodyException('Order is cancelled');
      }

      if (order.status === OrderStatus.COMPLETE) {
        throw new BadBodyException('Order is completed');
      }

      const paymentInstance = await this.paymentService.create({
        price: order.price,
        currency: 'usd',
        payment_methods: payment_method_types,
        idempotencyKey,
      });

      await unit.orderRepository.setStatus(orderId, OrderStatus.PENDING);
      await unit.paymentRepository.create({
        orderId,
        stripeId: paymentInstance.id,
        price: order.price,
        currency: 'usd',
      });

      await this.eventBusClient.publish<PaymentCreatedEvent>(Channels.PAYMENT_CREATED, {
        orderId: order.id,
        stripeId: paymentInstance.id,
        amount: order.price,
        currency: 'usd',
      });

      return {
        orderId,
        payment_service_details: {
          id: paymentInstance.id,
          client_secret: paymentInstance.client_secret,
        },
      };
    }); 
  }
}