import express from 'express';
import { meRouter } from './me';
import { OAuthCallbackRouter } from './oauth/oauthCallback';
import { signinRouter } from './signin';
import { signoutRouter } from './signout';
import { signupRouter } from './signup';
import { githubCodeRouter } from './oauth/githubCode';

const authRouter = express.Router();

authRouter.use(
  '/auth',
  meRouter,
  signinRouter, 
  signupRouter, 
  signoutRouter,
);

authRouter.use(
  '/oauth',
  githubCodeRouter,
  OAuthCallbackRouter,
);

export { authRouter };
