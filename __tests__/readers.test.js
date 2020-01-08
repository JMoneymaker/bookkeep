const { getUser, getUsers, getReadings } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reader routes', () => {

  it('creates a reader', async() => {
    const agent = request.agent(app);

    await agent
      .post('/api/v1/readers')
      .send({
        email: 'newReader@test.com',
        password: 'password'
      })

      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'newReader@test.com',
          __v: 0
        });
      });
  });

  it('gets all readers', async() => {
    const readers = await getUsers();

    return request(app)
      .get('/api/v1/readers')
      .then(res => {
        readers.forEach(reader => {
          expect(res.body).toContainEqual(reader);
        });
      });
  });


  it('gets a reader by id', async() => {
    const reader = await getUser();
    const readings = await getReadings({ userId: reader._id });

    return request(app)
      .get(`/api/v1/readers/${reader._id}`)
      .then(res => {
        readings.forEach(reading => {
          expect(res.body.reading).toContainEqual({
            _id: expect.any(String),
            userId: reading.userId,
          });
        });
        expect(res.body).toEqual({
          _id: reader._id,
          email: reader.email,
          reading: expect.any(Array),
          __v: 0
        });
      });
  });

  it('deletes a reader by id', async() => {
    const reader = await getUser();

    return request(app)
      .delete(`/api/v1/readers/${reader._id}`)
      .then(res => {
        expect(res.body).toEqual(reader);
      });
  });
});
