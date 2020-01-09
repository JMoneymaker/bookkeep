const { getBook, getUser, getShelf, getShelfs } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reading routes', () => {

  it('creates a reading', async() => {
    const book = await getBook();
    const user = await getUser();
    const agent = request.agent(app);

    return agent
      .post('/api/v1/shelfs')
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

  it('gets all shelfs', async() => {
    const shelfs = await getShelfs();

    return request(app)
      .get('/api/v1/shelfs')
      .then(res => {
        shelfs.forEach(shelf => {
          expect(res.body).toContainEqual(shelf);
        });
      });
  });

  it('gets a reading by id', async() => {
    const shelf = await getShelf();

    return request(app)
      .get(`/api/v1/shelfs/${shelf._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          bookId: shelf.bookId,
          userId: shelf.userId,
          dateAdded: shelf.dateAdded,
          rating: shelf.rating,
          __v: 0
        });
      });
  });

  it('updates a shelf', async() => {
    const shelf = await getShelf();

    return request(app)
      .patch(`/api/v1/shelfs/${shelf._id}`)
      .send({ dateRead: '2020-01-07T19:35:05.083Z' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          bookId: shelf.bookId,
          userId: shelf.userId,
          dateAdded: shelf.dateAdded,
          dateRead: '2020-01-07T19:35:05.083Z',
          rating: shelf.rating,
          __v: 0  
        });
      });
  });


  it('deletes a reading by id', async() => {
    const shelf = await getShelf();

    return request(app)
      .delete(`/api/v1/shelfs/${shelf._id}`)
      .then(res => {
        expect(res.body).toEqual(shelf);
      });
  });
});
