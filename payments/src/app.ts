import { NotFoundException, errorHandler, setCommonConfig } from '@app2/common';
import express from 'express'
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import cookieSession from 'cookie-session';
import { createRouter } from './routes/create';
import { completeRouter } from './routes/complete';

const app = express();
app.set('trust proxy', true);
app.use(bodyParser.json())
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
}));

const api = express.Router()
app.use('/api', api);

api.use(
  '/payments', 
  createRouter,
  completeRouter,
);

app.use('*', () => {
  throw new NotFoundException()
});

app.use(errorHandler);

export default app;