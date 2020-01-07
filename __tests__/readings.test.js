require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Book = require('../lib/models/Book');
const User = require('../lib/models/User');
const Publisher = require('../lib/models/Publisher');
const Author = require('../lib/models/Author');
const Reading = require('../lib/models/Reading');

describe('reading routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let book;
  let user;
  let publisher;
  let author;
  let reading;

  beforeEach(async() => {
    
    user = await User
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

    reading = await Reading
      .create({
        bookId: book._id,
        userId: user._id,
        dateAdded: '2020-01-07T19:35:05.083Z',
        rating: 5
      });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a reading', () => {
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
          bookId: book.id,
          userId: user.id,
          dateAdded: '2020-01-07T19:35:05.083Z',
          rating: 5,
          __v: 0
        });
      });
  });

  it('gets all readings', async() => {
    const readings = await Reading
      .create([{
        bookId: book._id,
        userId: user._id,
        dateAdded: '2020-01-07T19:35:05.083Z',
        rating: 5
      }]);

    return request(app)
      .get('/api/v1/readings')
      .then(res => {
        readings.forEach(reading => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(reading)));
        });
      });
  });

  it('gets a reading by id', async() => {
    return request(app)
      .get(`/api/v1/readings/${reading._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          bookId: book.id,
          userId: user.id,
          dateAdded: '2020-01-07T19:35:05.083Z',
          rating: 5,
          __v: 0
        });
      });
  });

  it('updates a reading', async() => {
    return request(app)
      .patch(`/api/v1/readings/${reading._id}`)
      .send({ dateRead: '2020-01-07T19:35:05.083Z' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          bookId: book.id,
          userId: user.id,
          dateAdded: '2020-01-07T19:35:05.083Z',
          dateRead: '2020-01-07T19:35:05.083Z',
          rating: 5,
          __v: 0  
        });
      });
  });

  it('deletes a reading by id', async() => {
    return request(app)
      .delete(`/api/v1/readings/${reading._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          bookId: book.id,
          userId: user.id,
          dateAdded: '2020-01-07T19:35:05.083Z',
          rating: 5,
          __v: 0  
        });
      });
  });



});
