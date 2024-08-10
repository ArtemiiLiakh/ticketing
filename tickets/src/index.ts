import { natsClient } from '@app2/common';
import { randomBytes } from 'crypto';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { OrderCreatedListener } from './listeners/OrderCreatedListener';
import { OrderCancelledListener } from './listeners/OrderCancelledListener';

const connectDatabase = async () => {
  await mongoose.connect(config.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log('MongoDB error');
    console.log(err);
  });
}; 

const connectNats = async () => {
  await natsClient.connect('test-cluster', randomBytes(4).toString('hex'), {
    url: config.NATS_URL,
  }).then(() => {
    new OrderCreatedListener(natsClient.client).listen();
    new OrderCancelledListener(natsClient.client).listen();
  }, (err) => {
    console.log('NATS error');
    console.log(err);
  });
};

app.listen(5001, async () => {
  console.clear();
  await connectDatabase();
  await connectNats();

  console.log('v0.0.4');
  console.log(config.CLIENT_DOMAIN);
  console.log('Started on http://localhost:5001');
});
