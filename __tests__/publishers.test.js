const { getPublisher, getPublishers, getBooks } = require('../lib/helpers/data-helpers');

const Book = require('../lib/models/Book');

const request = require('supertest');
const app = require('../lib/app');


describe('publisher routes', () => {

  it('creates a publisher', () => {
    return request(app)
      .post('/api/v1/publishers')
      .send({
        name: 'Random House',
        address: [
          {
            city: 'New York',
            state: 'New York',
            country: 'USA'
          }
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Random House',
          address: [
            {
              _id: expect.any(String),
              city: 'New York',
              state: 'New York',
              country: 'USA'
            }
          ],
          id: expect.any(String),
          __v: 0
        });
      });
  });

  it('finds all publishers', async() => {
    const publishers = await getPublishers();

    return request(app)
      .get('/api/v1/publishers')
      .then(res => {
        publishers.forEach(publisher => {
          expect(res.body).toContainEqual(publisher);
        });
      });
  });

  it('gets a publisher by id', async() => {
    const publisher = await getPublisher();
    const books = await getBooks({ publisherId: publisher._id });

    return request(app)
      .get(`/api/v1/publishers/${publisher._id}`)
      .then(res => {

        books.forEach(book => {
          expect(res.body.books).toContainEqual({ 
            _id: book._id,
            publisherId: publisher._id,
            title: book.title 
          });
        }),
        expect(res.body).toEqual({
          _id: publisher._id,
          name: publisher.name,
          address: publisher.address,
          id: expect.any(String),
          books: expect.any(Array),
          __v: 0
        });
      });
  });

  it('updates a publisher by id', async() => {
    const publisher = await getPublisher();
    const books = await getBooks({ publisherId: publisher._id });


    return request(app)
      .patch(`/api/v1/publishers/${publisher._id}`)
      .send({ name: 'Harper Collins' })
      .then(res => {
        books.forEach(book => {
          expect(res.body.books).toContainEqual({ 
            _id: book._id,
            publisherId: publisher._id,
            title: book.title 
          });
        }),
        expect(res.body).toEqual({
          _id: publisher._id,
          name: 'Harper Collins',
          address: publisher.address,
          id: expect.any(String),
          books: expect.any(Array),
          __v: 0
        });
      });
  });

  it('will delete a publisher with no books', async() => {
    const publisher = await getPublisher();
    await Book.deleteMany({ publisherId: publisher._id });

    return request(app)
      .delete(`/api/v1/publishers/${publisher._id}`)
      .then(res => {
        expect(res.body).toEqual(publisher);
      });
  });


  it('does not delete a publisher that has books', async() => {
    const publisher = await getPublisher();

    return request(app)
      .delete(`/api/v1/publishers/${publisher._id}`)
      .then(res => {
        expect(res.body.message).toEqual(
          'This publisher has books and cannot be deleted.');
      });
  });
});

