require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('auth routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can signup a user with email and password', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'signup@test.com', password: 'password' })
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'signup@test.com',
          __v: 0
        });
      });
  });
	
  it('can login a user with an email and password', async() => {
    const user = await User.create({
      email: 'login@test.com',
      password: 'password'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'login@test.com', password: 'password' })
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({
          _id: user.id,
          email: 'login@test.com',
          __v: 0
        });
      });
  });
	
  it('will not log in a user with a bad email', async() => {
    await User.create({
      email: 'check-email@test.com',
      password: 'password'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'notTheRightEmail@nope.ec', password: 'password' })
      .then(res => {
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
          status: 401,
          message: 'Invalid Email/Password'
        });
      });
  });
	
  it('will not log in a user with a bad password', async() => {
    await User.create({
      email: 'check-password@test.com',
      password: 'password'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'check-password@test.com', password: 'wrongPassword' })
      .then(res => {
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
          status: 401,
          message: 'Invalid Email/Password'
        });
      });
  });
	
  it('can verify if a user is logged in', async() => {
    const user = await User.create({
      email: 'verify-login@test.com',
      password: 'password'
    });

    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ email: 'verify-login@test.com', password: 'password' });

    return agent
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: user.id,
          email: 'verify-login@test.com',
          __v: 0
        });
      });
  });
});
