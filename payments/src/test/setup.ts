import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: MongoMemoryServer;

jest.mock('@app2/common', () => ({
  ...jest.requireActual('@app2/common'),
  natsClient: {
    client: {
      publish: jest.fn().mockImplementation(
        (subject: any, data: any, callback: () => void) => {
          callback();
        }
      ),
    }
  }
}));

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri)
});

beforeEach(async () => {
  jest.clearAllMocks();

  for (const collection in mongoose.connection.collections) {
    await mongoose.connection.collections[collection].deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});