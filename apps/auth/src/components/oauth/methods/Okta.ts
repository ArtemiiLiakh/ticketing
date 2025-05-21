import { AuthType } from '@app2/common/types';
import { UserRepository } from '@components/repositories/UserRepository';
import config from '@config/index';
import { OAuthMethod } from '../OAuthMethod';

interface OktaData {
  sub: string
  name: string
  given_name?: string
  family_name?: string
  middle_name?: string
  nickname: string
  preferred_username?: string
  profile?: string
  picture: string
  website?: string
  email: string
  email_verified: boolean
  gender?: string
  birthdate?: string
  zoneinfo?: string
  locale?: string
  phone_number?: string
  phone_number_verified?: boolean
  address?: {
    country: string
  }
  updated_at: Date
}

export class OktaOAuthMethod implements OAuthMethod {
  constructor (
    private readonly userRepository: UserRepository,
  ) {}

  async call(accessToken: string): Promise<string> {
    const headers = new Headers();
      
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer '+accessToken);

    const userInfo = await fetch(`https://${config.OKTA_APP_DOMAIN}/userinfo`, {
      method: 'GET',
      headers,
    });

    const data: OktaData = await userInfo.json();
    console.log(data);

    const sub = data.sub.split('|')[1];

    const user = await this.userRepository.getByEmail(data.email);
    if (user) { 
      return user.id
    }
    
    return this.userRepository.createWithAuth({
      sub,
      email: data.email,
      name: data.name,
      authType: AuthType.OKTA,
      email_verified: data.email_verified,
      pictureUrl: data.picture,
    });
  }
} 