import { natsClient } from "@app2/common"
import { randomBytes } from 'crypto';
import config from "./config";
import { OrderCreatedListener } from "./listeners/OrderCreatedListener";
import { PaymentCreatedListener } from "./listeners/PaymentCreatedListener";

const connectNats = async () => {
  await natsClient.connect('test-cluster', randomBytes(4).toString('hex'), {
    url: config.NATS_URL
  });

  new OrderCreatedListener(natsClient.client).listen();
  new PaymentCreatedListener(natsClient.client).listen();
}

console.clear();
connectNats();