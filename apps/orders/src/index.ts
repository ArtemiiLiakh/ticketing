import { connectDatabase } from '@connections/database';
import { connectNats } from '@connections/nats';
import app from "./app";
import config from "./config";

app.listen(5002, async () => {
  console.clear();
  await connectDatabase();
  await connectNats();

  console.log('v0.0.5');
  console.log(config.CLIENT_DOMAIN);
  console.log('Started on http://localhost:5002')
});
