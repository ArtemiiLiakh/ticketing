import { UserRepository } from '@components/repositories/UserRepository';
import { OAuthMethod } from '../OAuthMethod';
import { AuthType } from '@app2/common/types';

interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  hireable?: boolean;
  bio?: string;
  twitter_username?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists?: number;
  total_private_repos?: number;
  owned_private_repos?: number;
  disk_usage?: number;
  collaborators?: number;
  two_factor_authentication: boolean;
  plan?: {
    name: string;
    space: number;
    private_repos: number;
    collaborators: number;
  };
}

interface UserEmails {
  email: string,
  primary: boolean,
  verified: boolean,
  visibility: string 
}

export class GithubOAuthMethod implements OAuthMethod {
  constructor (
    private readonly userRepository: UserRepository,
  ) {}
  
  async call(accessToken: string): Promise<string> {
    const headers = new Headers();

    headers.append('Accept','application/json');
    headers.append('Authorization', 'Bearer '+accessToken);

    const res = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers,
    });

    const githubUser = await res.json() as GitHubUser;

    const emails: UserEmails[] = await fetch('https://api.github.com/user/emails', {
      method: 'GET',
      headers,
    }).then((data) => data.json());

    const { email, verified } = emails.filter(email => email.primary)[0];

    const user = await this.userRepository.getByEmail(email);
    if (user) return user.id;

    return this.userRepository.createWithAuth({
      authType: AuthType.GITHUB,
      sub: githubUser.id.toString(),
      email,
      name: githubUser.name ?? githubUser.login,
      email_verified: verified,
      pictureUrl: githubUser.avatar_url,
    });
  }
}