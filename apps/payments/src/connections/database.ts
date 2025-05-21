import mongoose from 'mongoose';
import config from '../config';

export const connectDatabase = (): Promise<void> => {
  return mongoose.connect(config.MONGO_URI, {
    directConnection: true,
    replicaSet: 'rs0'
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log('MongoDB error');
    console.log(err);
  });
}; 