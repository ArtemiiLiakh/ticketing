import { connectNats } from './connections/nats';
import { orderExpiredProcess } from './messageQueue/processings/orderExpiredProcess';

const main = async (): Promise<void> => {
  await connectNats();

  orderExpiredProcess()
  console.log('Started server')
}

main();