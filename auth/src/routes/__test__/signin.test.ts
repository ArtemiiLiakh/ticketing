import request from 'supertest';
import app from '../../app';
import { signup } from '../../test/utils';

describe('Test /auth/signin route', () => {
  it('returns 401 if email is not found', async () => {
    await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'wrong@gmail.com',
        password: 'password',
      })
      .expect(401);
  });

  it('returns 400 if password is incorrect', async () => {
    await signup();

    await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'example@gmail.com',
        password: 'wrong',
      })
      .expect(400)
  });

  it('return 200 with valid data', async () => {
    await signup();
    
    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'example@gmail.com',
        password: 'password',
      })
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
})