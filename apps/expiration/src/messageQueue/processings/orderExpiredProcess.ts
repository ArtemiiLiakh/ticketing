import { ExpirationCompletedEvent } from '@app2/service-utils/eventbus/events';
import { Channels } from '@app2/service-utils/eventbus/Channels';
import { NATSEventBusDI } from '../../di/NATSEventBusDI';
import { OrderExpiredQueue } from '../queues/OrderExpiredQueue';

export const orderExpiredProcess = (): void => {
  OrderExpiredQueue.process(async (job) => {
    await NATSEventBusDI.publish<ExpirationCompletedEvent>(Channels.EXPIRATION_COMPLETED, {
      orderId: job.data.orderId,
    });
  });
}