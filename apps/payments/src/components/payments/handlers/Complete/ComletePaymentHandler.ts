import { ForbiddenException, NoEnityWithIdException, NotFoundException } from '@app2/common/exceptions';
import { AsyncHandler, OrderStatus } from '@app2/common/types';
import { Channels, EventBusClient } from '@app2/service-utils/eventbus';
import { PaymentCompletedEvent } from '@app2/service-utils/eventbus/events';
import { OrderRepository } from '@components/repositories/OrderRepository';
import { PaymentRepository } from '@components/repositories/PaymentRepository';
import { CompletePaymentDTO } from './CompletePaymentDTO';
import { CompletePaymentResponse } from './CompletePaymentReponse';

export class CompletePaymentHandler implements AsyncHandler<CompletePaymentDTO, CompletePaymentResponse> {
  constructor (
    private readonly orderRepository: OrderRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly eventBusClient: EventBusClient,
  ) {}

  async handle({ orderId, executorId }: CompletePaymentDTO): Promise<void> {
    const order = await this.orderRepository.getById(orderId);

    if (!order) {
      throw new NoEnityWithIdException('Order');
    }

    if (order.userId !== executorId) {
      throw new ForbiddenException('You cannot complete other\'s order');
    }

    const payment = await this.paymentRepository.getByOrder(orderId);

    if (!payment) {
      throw new NotFoundException('Payment was not created for this order');
    }

    this.orderRepository.setStatus(orderId, OrderStatus.COMPLETE)
    
    await this.eventBusClient.publish<PaymentCompletedEvent>(Channels.PAYMENT_CONFIRMED, {
      orderId: orderId,
      version: order.version,
    });
  }
}