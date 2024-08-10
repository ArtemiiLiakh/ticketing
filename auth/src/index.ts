import mongoose from 'mongoose';
import app from './app';
import config from './config';

const connectDatabase = async () => {
  await mongoose.connect(config.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log('error');
    console.log(err);
  });
}; 

app.listen(5000, async () => {
  console.clear();
  await connectDatabase();
  console.log('v0.0.5');
  console.log(config.CLIENT_URL);
  console.log('Started on http://localhost:5000')
});
