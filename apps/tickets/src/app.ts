import { setCommonConfig } from '@app2/common';
import { errorHandler } from '@app2/common/middlewares';
import { NotFoundException } from '@app2/common/exceptions';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import config from './config';
import { createRouter } from './routes/create';
import { getRouter } from './routes/get';
import { updateRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors({
  origin: config.CLIENT_URL,
  credentials: true,
}));

setCommonConfig({
  JWT_SECRET: config.JWT_SECRET,
});

app.use(cookieSession({
  name: 'session',
  signed: false,
  secure: config.HTTP_SECURE,
  maxAge: 12 * 60 * 60 * 1000,
  domain: config.CLIENT_DOMAIN,
}));

const apiRouter = express.Router()

app.use('/api', apiRouter);

apiRouter.use(
  '/tickets', 
  createRouter,
  getRouter,
  updateRouter,
);

app.use('*', () => {
  throw new NotFoundException();
});

app.use(errorHandler);

export default app;