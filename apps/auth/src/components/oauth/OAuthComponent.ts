import { IOAuthComponent } from './IOAuthComponent';
import { GithubOAuthMethod } from './methods/Github';
import { GoogleOAuthMethod } from './methods/Google';
import { OktaOAuthMethod } from './methods/Okta';

export class OAuthComponent implements IOAuthComponent {
  constructor (
    public readonly github: GithubOAuthMethod,
    public readonly google: GoogleOAuthMethod,
    public readonly okta: OktaOAuthMethod,
  ) {}
}