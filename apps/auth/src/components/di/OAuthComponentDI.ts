import { GithubOAuthMethod } from '@components/oauth/methods/Github';
import { GoogleOAuthMethod } from '@components/oauth/methods/Google';
import { OktaOAuthMethod } from '@components/oauth/methods/Okta';
import { OAuthComponent } from '../oauth/OAuthComponent';
import { UserRepositoryDI } from './UserRepositoryDI';

export const OAuthComponentDI = new OAuthComponent(
  new GithubOAuthMethod(UserRepositoryDI),
  new GoogleOAuthMethod(UserRepositoryDI),
  new OktaOAuthMethod(UserRepositoryDI),
);