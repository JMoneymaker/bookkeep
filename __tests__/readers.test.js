require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Book = require('../lib/models/Book');
const Reader = require('../lib/models/User');
const Publisher = require('../lib/models/Publisher');
const Author = require('../lib/models/Author');
const Reading = require('../lib/models/Reading');

describe('reader routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let book;
  let reader;
  let publisher;
  let author;

  beforeEach(async() => {
    
    reader = await Reader
      .create({
        email: 'login@test.com',
        password: 'password'
      });

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

    author = await Author
      .create({
        name: 'Octavia Butler'
      });

    book = await Book
      .create({
        publisherId: publisher._id,
        authorId: author._id,
        ISBN: '978-3-16-148410-0',
        title: 'Fledgling',
        published: 2004,
      });

    await Reading
      .create({
        bookId: book._id,
        userId: reader._id,
        dateAdded: '2020-01-07T19:35:05.083Z',
        rating: 5
      });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a reader', () => {
    const agent = request.agent(app);

    return agent
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
    const readers = await Reader
      .create([{
        email: 'getReaders@test.com',
        password: 'password'
      }]);

    return request(app)
      .get('/api/v1/readers')
      .then(res => {
        readers.forEach(reader => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(reader)));
        });
      });
  });

  it('gets a reader by id', async() => {
    return request(app)
      .get(`/api/v1/readers/${reader._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reader.id,
          email: 'login@test.com',
          reading: [{
            _id: expect.any(String),
            userId: expect.any(String),
          }],
          __v: 0
        });
      });
  });

  it('deletes a reader by id', async() => {
    return request(app)
      .delete(`/api/v1/readers/${reader._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reader.id,
          email: 'login@test.com',
          __v: 0
        });
      });
  });
});
