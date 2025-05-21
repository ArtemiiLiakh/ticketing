import { AuthType } from '@app2/common/types';
import { UserRepository } from '@components/repositories/UserRepository';
import { OAuthMethod } from '../OAuthMethod';

interface GoogleData {
  id: string,
  email: string,
  family_name: string,
  name: string,
  given_name: string,
  picture: string,
  verified_email: boolean,
}

export class GoogleOAuthMethod implements OAuthMethod {
  constructor (
    private readonly userRepository: UserRepository,
  ) {}
  
  async call(accessToken: string): Promise<string> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer '+accessToken)
  
    const userInfo = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      method: 'GET',
      headers,
    });
  
    const data: GoogleData = await userInfo.json();
  
    const user = await this.userRepository.getByEmail(data.email);
    if (user) return user.id;

    return this.userRepository.createWithAuth({
      sub: data.id,
      email: data.email,
      name: data.name,
      authType: AuthType.OKTA,
      email_verified: data.verified_email,
      pictureUrl: data.picture,
    });
  }
}