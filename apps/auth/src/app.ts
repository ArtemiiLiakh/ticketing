import { NotFoundException } from '@app2/common/exceptions';
import { errorHandler } from '@app2/common/middlewares';
import { setCommonConfig } from '@app2/common'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import config from './config';
import { authRouter } from './routes';

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
  domain: config.CLIENT_DOMAIN,
}));

const api = express.Router()

app.use('/api', api);
api.use(authRouter);

app.use('*', () => {
  throw new NotFoundException();
});

app.use(errorHandler);

export default app;