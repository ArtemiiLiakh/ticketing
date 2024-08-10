import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { meRouter } from './routes/me';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import cors from 'cors';
import config from './config';
import { setCommonConfig, NotFoundException, errorHandler } from '@app2/common';

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
  maxAge: 12*60*60*1000,
}));

const api = express.Router()

app.use('/api', api);

api.use(
  '/auth',
  meRouter,
  signinRouter, 
  signupRouter, 
  signoutRouter,
);

app.use('*', () => {
  throw new NotFoundException();
});

app.use(errorHandler);

export default app;