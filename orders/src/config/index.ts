import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV ?? 'dev'}`,
});

interface ConfigSchema {
  NODE_ENV: 'dev' | 'prod';
  HTTP_SECURE: boolean;
  JWT_SECRET: string;
  CLIENT_URL: string;
  CLIENT_DOMAIN: string;
  MONGO_URI: string;
  NATS_URL: string;
  ORDER_EXPIRATION: number;
}

export default {
  NODE_ENV: process.env.NODE_ENV,
  HTTP_SECURE: process.env.HTTP_SECURE === 'true',
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
  CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
  MONGO_URI: process.env.MONGO_URI,
  NATS_URL: process.env.NATS_URL,
  ORDER_EXPIRATION: parseInt((process.env.ORDER_EXPIRATION ?? 15*60).toString()),
} as ConfigSchema;