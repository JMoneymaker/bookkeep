const { getUser, getUsers, getShelfs } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reader routes', () => {

  it('creates a user', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/users')
      .send({
        email: 'newUser@test.com',
        password: 'password'
      })

      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'newUser@test.com',
          __v: 0
        });
      });
  });

  it('gets all users', async() => {
    const users = await getUsers();

    return request(app)
      .get('/api/v1/users')
      .then(res => {
        users.forEach(user => {
          expect(res.body).toContainEqual(user);
        });
      });
  });


  it('gets a user by id', async() => {
    const user = await getUser();
    const shelfs = await getShelfs({ userId: user._id });

    return request(app)
      .get(`/api/v1/users/${user._id}`)
      .then(res => {
        shelfs.forEach(shelf => {
          expect(res.body.shelf).toContainEqual({
            _id: expect.any(String),
            userId: shelf.userId,
          });
        });
        expect(res.body).toEqual({
          _id: user._id,
          email: user.email,
          shelf: expect.any(Array),
          __v: 0
        });
      });
  });

  it('deletes a user by id', async() => {
    const user = await getUser();

    return request(app)
      .delete(`/api/v1/users/${user._id}`)
      .then(res => {
        expect(res.body).toEqual(user);
      });
  });
});
