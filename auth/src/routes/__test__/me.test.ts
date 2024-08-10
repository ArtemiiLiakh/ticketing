import request from 'supertest';
import app from '../../app';
import { signup } from '../../test/utils';

describe('Test /auth/me route', () => {
  it('returns details about the current user', async () => {
    const { cookie } = await signup();

    const res = await request(app)
      .get('/api/auth/me')
      .set('Cookie', cookie)
      .send();
    
    
    expect(res.body.email).toEqual('example@gmail.com');
  });
});