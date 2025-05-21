import request from 'supertest';
import app from '../../app';
import { signup } from '../../test/utils';

describe('Test /auth/signout route', () => {
  it('clears the cookie after signing out', async () => {
    const { cookie } = await signup();

    const response = await request(app)
      .get('/api/auth/signout')
      .set('Cookie', cookie)
      .send()
      .expect(200);
    
    expect(response.get('Set-Cookie')?.[0])
      .toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
  });
});