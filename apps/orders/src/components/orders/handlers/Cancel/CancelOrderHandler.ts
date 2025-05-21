import { ForbiddenException, NoEnityWithIdException } from '@app2/common/exceptions';
import { AsyncHandler, OrderStatus } from '@app2/common/types';
import { Channels, EventBusClient } from '@app2/service-utils/eventbus';
import { OrderCancelledEvent } from '@app2/service-utils/eventbus/events';
import { OrderRepository } from '@components/repositories/OrderRepository';
import { CancelOrderDTO } from './CancelOrderDTO';
import { CancelOrderResponse } from './CancelOrderResponse';

export class CancelOrderHandler implements AsyncHandler<CancelOrderDTO, CancelOrderResponse> {
  constructor (
    private readonly orderRepository: OrderRepository,
    private readonly eventBusClient: EventBusClient,
  ) {}

  async handle({ executorId, orderId }: CancelOrderDTO): Promise<void> {
    const order = await this.orderRepository.getById(orderId);
    
    if (!order) {
      throw new NoEnityWithIdException('Order');
    }

    if (order.userId !== executorId) {
      throw new ForbiddenException('You cannot cancel the order');
    }

    await this.orderRepository.setStatus(orderId, OrderStatus.CANCELLED);

    await this.eventBusClient.publish<OrderCancelledEvent>(
      Channels.ORDER_CANCELLED,
      {
        id: order.id,
        ticket: {
          id: order.ticketId,
        },
        version: order.version++,
      },
    );
  }
}