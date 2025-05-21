import dotenv from 'dotenv';

dotenv.config({
  path: `env/.env.${process.env.NODE_ENV ?? 'prod'}`,
});

interface ConfigSchema {
  NODE_ENV: 'dev' | 'prod';
  HTTP_SECURE: boolean;
  JWT_SECRET: string;
  CLIENT_URL: string;
  CLIENT_DOMAIN: string;
  MONGO_URI: string;

  OKTA_APP_DOMAIN: string;
}

export default {
  NODE_ENV: process.env.NODE_ENV,
  HTTP_SECURE: process.env.HTTP_SECURE === 'true',
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
  CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
  MONGO_URI: process.env.MONGO_URI,
  
  OKTA_APP_DOMAIN: process.env.OKTA_APP_DOMAIN,
} as ConfigSchema;