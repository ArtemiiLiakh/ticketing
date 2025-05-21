import config from '@/config';
import { useApiRequest } from '@/hooks/useRequest';
import { base64ToBase64Url } from '@app2/common/utils';
import { createHash, randomBytes } from 'crypto';
import Router from 'next/router';
import React, { useCallback, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function Login({ user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { request, errors, setErrors } = useApiRequest();

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await request({
      path: '/auth/signin',
      method: 'post',
      data: {
        email,
        password
      }
    });

    if (response) {
      Router.push('/');
    }
  }, [email, password]);

  const handleOkta = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    const url = new URL('https://dev-qym2trrie4ynwlea.us.auth0.com/authorize');
    url.searchParams.set('scope', 'openid profile email');
    url.searchParams.set('response_type', 'token');
    url.searchParams.set('client_id', config.NEXT_PUBLIC_OKTA_CLIENT_ID!);
    url.searchParams.set('redirect_uri', config.NEXT_PUBLIC_HOST+'/auth/callbacks/okta');
    url.searchParams.set('prompt', 'login');

    window.location.href = url.toString();
  }, []);

  const handleGoogle = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    const hash = createHash('sha256');
    const state = base64ToBase64Url(hash.update(randomBytes(32).toString('hex')).digest('base64'));

    localStorage.setItem('state', state);

    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.searchParams.set('client_id', config.NEXT_PUBLIC_GOOGLE_CLIENT_ID!);
    url.searchParams.set('response_type', 'token');
    url.searchParams.set('scope', 'openid profile email');
    url.searchParams.set('redirect_uri', config.NEXT_PUBLIC_HOST+'/auth/callbacks/google');
    url.searchParams.set('state', state);

    window.location.href = url.toString();
  }, []);
  
  const handleGithub = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    const hash = createHash('sha256');
    const state = base64ToBase64Url(hash.update(randomBytes(32).toString('hex')).digest('base64'));

    localStorage.setItem('state', state);

    const url = new URL('https://github.com/login/oauth/authorize');
    url.searchParams.set('client_id', config.NEXT_PUBLIC_GITHUB_CLIENT_ID!);
    url.searchParams.set('scope', 'user');
    url.searchParams.set('redirect_uri', config.NEXT_PUBLIC_HOST+'/auth/callbacks/github');
    url.searchParams.set('state', state);
    url.searchParams.set('prompt', 'select_account');

    window.location.href = url.toString();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      { user ? <h4>You are logged in as {user.email}</h4> : ''}

      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control 
          id="email" 
          type="text" 
          placeholder='Enter email' 
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors(undefined);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control 
          id="password" 
          type="password" 
          placeholder='Enter password' 
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors(undefined);
          }}
        />
      </Form.Group>

      { errors }
      
      <Button className="auth-btn" onClick={handleOkta}>OAuth with Okta</Button>
      <Button className="auth-btn" onClick={handleGoogle}>OAuth with Google</Button>
      <Button className="auth-btn" onClick={handleGithub}>OAuth with GitHub</Button>
      <Button className="auth-btn" type="submit">Login</Button>
    </Form>
  );
}