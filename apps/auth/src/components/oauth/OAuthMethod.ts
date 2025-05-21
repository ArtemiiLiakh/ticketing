export interface OAuthMethod {
  call(accessToken: string): Promise<string>;
}
