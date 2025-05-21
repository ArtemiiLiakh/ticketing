import { OrderRepositoryDI } from '@components/di/OrderRepositoryDI';
import { TicketRepositoryDI } from '@components/di/TicketRepositoryDI';
import config from '@config';
import { NATSEventBusDI } from '@di/EventBusDI';
import { ExpirationCompleteListener } from '@components/eventListeners/ExpirationCompleteListener';
import { PaymentCompletedListener } from '@components/eventListeners/PaymentCompletedListener';
import { PaymentCreatedListener } from '@components/eventListeners/PaymentCreatedListener';
import { TicketCreatedListener } from '@components/eventListeners/TicketCreatedListener';
import { TicketUpdatedListener } from '@components/eventListeners/TicketUpdatedListener';
import { randomBytes } from 'crypto';

export const connectNats = async (): Promise<void> => {
  const natsClient = NATSEventBusDI;

  await natsClient.connect({
    clusterId: 'test-cluster',
    clientId: randomBytes(4).toString('hex'),
    opts: {
      url: config.NATS_URL,
    }
  }).then(() => {
    natsClient.listen(new TicketCreatedListener(TicketRepositoryDI));
    natsClient.listen(new TicketUpdatedListener(TicketRepositoryDI));
    natsClient.listen(new ExpirationCompleteListener(OrderRepositoryDI, natsClient));
    natsClient.listen(new PaymentCreatedListener(OrderRepositoryDI));
    natsClient.listen(new PaymentCompletedListener(OrderRepositoryDI));
  }, (err) => {
    console.log('NATs error');
    console.log(err);
  });
}