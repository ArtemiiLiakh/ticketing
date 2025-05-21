import express, { Request, Response } from 'express';
import { OAuthConfig } from '../../config/oauth';
import querystring from 'querystring';

interface QueryCode extends Request {
  query: {
    code: string,
  },
}

const githubCodeRouter = express.Router();

githubCodeRouter.get('/github/token', async (req: QueryCode, res: Response) => {
  const code = req.query.code;

  const url = new URL('https://github.com/login/oauth/access_token');
  url.searchParams.append('client_id', OAuthConfig.github.clientId);
  url.searchParams.append('client_secret', OAuthConfig.github.secret);
  url.searchParams.append('code', code);
  url.searchParams.append('redirect_uri', 'http://local.test.com:8080/auth/callbacks/github');
  
  const data = await fetch(url, {
    method: 'GET',
  });

  const accessToken = querystring.parse(await data.text());

  res.send({
    token: accessToken['access_token'],
  });
});

export { githubCodeRouter };