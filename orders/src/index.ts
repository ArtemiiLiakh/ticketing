import { natsClient } from "@app2/common";
import { randomBytes } from 'crypto';
import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { TicketCreatedListener } from "./listeners/TicketCreatedListener";
import { TicketUpdatedListener } from "./listeners/TicketUpdatedListener";
import { ExpirationCompleteListener } from "./listeners/ExpirationCompleteListener";
import { PaymentCreatedListener } from "./listeners/PaymentCreatedListener";
import { PaymentCompletedListener } from "./listeners/PaymentCompletedListener";

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
    new TicketCreatedListener(natsClient.client).listen();
    new TicketUpdatedListener(natsClient.client).listen();
    new ExpirationCompleteListener(natsClient.client).listen();
    new PaymentCreatedListener(natsClient.client).listen();
    new PaymentCompletedListener(natsClient.client).listen();
  }, (err) => {
    console.log('NATS error');
    console.log(err);
  });
}

app.listen(5002, async () => {
  console.clear();
  await connectDatabase();
  await connectNats();

  console.log('v0.0.5');
  console.log(config.CLIENT_DOMAIN);
  console.log('Started on http://localhost:5002')
});
