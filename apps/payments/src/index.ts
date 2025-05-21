import { connectDatabase } from '@connections/database';
import { connectNats } from '@connections/nats';
import app from "./app";
import config from "./config";

app.listen(5003, async () => {
  console.clear();
  await connectDatabase();
  await connectNats();

  console.log('v0.0.4');
  console.log(`Started on http://${config.CLIENT_DOMAIN}:5003`)
});