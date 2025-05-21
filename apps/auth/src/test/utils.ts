import request from 'supertest';
import app from '../app';

export const signup = async (email = 'example@gmail.com', password = 'password') => {
  const authResponse = await request(app)
      .post('/api/auth/signup')
      .send({
        email,
        password,
      })
      .expect(201);
    
  return {
    response: authResponse,
    cookie: authResponse.get('Set-Cookie') ?? [''],
    headers: authResponse.headers,
    body: authResponse.body,
  };
}