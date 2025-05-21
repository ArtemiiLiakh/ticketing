import fs from 'fs';

interface GithubSchema {
  clientId: string
  secret: string
}

interface GoogleSchema {
  clientId: string
  secret: string
  projectId: string
}

interface OktaSchema {
  clientId: string
  secret: string
  domain: string
}

const github = fs.readFileSync('env/oauth/github.json', 'utf-8');
const google = fs.readFileSync('env/oauth/google.json', 'utf-8');
const okta = fs.readFileSync('env/oauth/okta.json', 'utf-8');

export const OAuthConfig = {
  github: JSON.parse(github) as GithubSchema,
  google: JSON.parse(google) as GoogleSchema,
  okta: JSON.parse(okta) as OktaSchema,
};