import request from 'supertest';
import app from '../../app';
import { signup } from '../../test/utils';

describe('Test /auth/signup route', () => {
  it('successfull sign up', async () => {
    const { cookie } = await signup();

    expect(cookie).toBeDefined();
  });

  it('returns 400 if email is invalid', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'wronggmail.com',
        password: 'password',
      })
      .expect(400)
  });

  it('returns 400 if email and password missing', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({})
      .expect(400)
  });

  it('dissalowes duplicate emails', async () => {
    await signup();

    await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'example@gmail.com',
        password: 'password',
      })
      .expect(400);
  });
});
