import app from './app';
import config from './config';
import { connectDatabase } from './connection/database';
import { connectNats } from './connection/nats';

app.listen(5001, async () => {
  console.clear();
  await connectDatabase();
  await connectNats();

  console.log('v0.0.4');
  console.log(config.CLIENT_DOMAIN);
  console.log('Started on http://localhost:5001');
});
