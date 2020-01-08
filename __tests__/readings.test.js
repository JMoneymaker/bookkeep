const { getPublisher, getBook, getAuthor, getUser, getReading, getReadings } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reading routes', () => {

  it('creates a reading', async() => {
    const book = await getBook();
    const user = await getUser();
    const agent = request.agent(app);

    return agent
      .post('/api/v1/readings')
      .send({
        bookId: book._id,
        userId: user._id,
        dateAdded: '2020-01-07T19:35:05.083Z',
        rating: 5
      })

      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          bookId: expect.any(String),
          userId: expect.any(String),
          dateAdded: '2020-01-07T19:35:05.083Z',
          rating: 5,
          __v: 0
        });
      });
  });

  it('gets all readings', async() => {
    const readings = await getReadings();

    return request(app)
      .get('/api/v1/readings')
      .then(res => {
        readings.forEach(reading => {
          expect(res.body).toContainEqual(reading);
        });
      });
  });

  it('gets a reading by id', async() => {
    const reading = await getReading();

    return request(app)
      .get(`/api/v1/readings/${reading._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          bookId: reading.bookId,
          userId: reading.userId,
          dateAdded: reading.dateAdded,
          rating: reading.rating,
          __v: 0
        });
      });
  });

  it('updates a reading', async() => {
    const reading = await getReading();

    return request(app)
      .patch(`/api/v1/readings/${reading._id}`)
      .send({ dateRead: '2020-01-07T19:35:05.083Z' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          bookId: reading.bookId,
          userId: reading.userId,
          dateAdded: reading.dateAdded,
          dateRead: '2020-01-07T19:35:05.083Z',
          rating: reading.rating,
          __v: 0  
        });
      });
  });


  it('deletes a reading by id', async() => {
    const reading = await getReading();

    return request(app)
      .delete(`/api/v1/readings/${reading._id}`)
      .then(res => {
        expect(res.body).toEqual(reading);
      });
  });
});
