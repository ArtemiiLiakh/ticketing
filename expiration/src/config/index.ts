import dotenv from "dotenv"

dotenv.config({
  path: `.env.${process.env.NODE_ENV ?? 'dev'}`
});

interface ConfigSchema {
  NATS_URL: string;
  REDIS_URI: string;
}

export default {
  NATS_URL: process.env.NATS_URL,
  REDIS_URI: process.env.REDIS_URI,
} as ConfigSchema;