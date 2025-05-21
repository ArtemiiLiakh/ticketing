import mongoose from 'mongoose';
import config from '../config';

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(config.MONGO_URI, {
    replicaSet: 'rs0',
    directConnection: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log('error');
    console.log(err);
  });
}; 