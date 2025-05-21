import config from '@config';
import mongoose from 'mongoose';

export const connectDatabase = (): Promise<void> => {
  return mongoose.connect(config.MONGO_URI, {
    directConnection: true,
    replicaSet: 'rs0'
  })
    .then(() => {
      console.log('Connected to MongoDB');
    }, (err) => {
      console.log('MongoDB error');
      console.log(err);
    });
}; 