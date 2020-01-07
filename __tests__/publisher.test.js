require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Publisher = require('../lib/models/Publisher');
const Book = require('../lib/models/Book');

describe('publisher routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let publisher;
  let book;

  beforeEach(async() => {
    publisher = await Publisher
      .create({
        name: 'Random House',
        address: [
          {
            city: 'New York',
            state: 'New York',
            country: 'USA'
          }
        ]
      });

    book = await Book
      .create({
        publisherId: publisher._id,
        ISBN: '978-3-16-148410-0',
        title: 'Fledgling',
        published: 2004,
      });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a publisher', () => {
    const agent = request.agent(app);

    return agent
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
    const publishers = await Publisher.create([
      {
        name: 'Harper Collins',
        address: [
          {
            city: 'New York',
            state: 'New York',
            country: 'USA'
          }
        ]
      },
    ]);

    return request(app)
      .get('/api/v1/publishers')
      .then(res => {
        publishers.forEach(publisher => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(publisher)));
        });
      });
  });

  it('gets a publisher by id', async() => {
    return request(app)
      .get(`/api/v1/publishers/${publisher._id}`)
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
          books: [{
            _id: book.id,
            publisherId: publisher.id,
            title: book.title
          }],
          __v: 0
        });
      });
  });

  it('updates a publisher by id', async() => {
    return request(app)
      .patch(`/api/v1/publishers/${publisher._id}`)
      .send({ name: 'Harper Collins' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Harper Collins',
          address: [
            {
              _id: expect.any(String),
              city: 'New York',
              state: 'New York',
              country: 'USA'
            }
          ],
          id: expect.any(String),
          books: [{
            _id: book.id,
            publisherId: publisher.id,
            title: book.title
          }],
          __v: 0
        });
      });
  });
});

