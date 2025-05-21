import app from './app';
import config from './config';
import { connectDatabase } from './connections/database';

app.listen(5000, async () => {
  console.clear();
  
  await connectDatabase();

  console.log(`Started on http://${config.CLIENT_DOMAIN}:5000`)
});
