require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Book = require('../lib/models/Book');
const User = require('../lib/models/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let book;
  let user;

  beforeEach(async() => {
    user = await User.create({
      email: 'test@testing.com',
      password: 'password'
    });
    book = await Book.create({
      readingList: user._id,
      title: 'Fledgling',
      addDate: '2019-12-30',
      author: 'Octavia Butler',
      genre: 'Sci-Fi/Fantasy'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('creates a book', async() => {
    await User.create({ email: 'createOneTest@testing.com', password: 'password' });

    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ email: 'createOneTest@testing.com', password: 'password' });

    return agent
      .post('/api/v1/books')
      .send({
        readingList: user._id,
        title: 'Fledgling',
        addDate: '2019-12-30',
        author: 'Octavia Butler',
        genre: 'Sci-Fi/Fantasy'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Fledgling',
          addDate: expect.any(String),
          author: 'Octavia Butler',
          genre: 'Sci-Fi/Fantasy',
          readingList: user._id.toString(),
          __v: 0
        });
      });
  });

  it('finds all books', async() => {
    const books = await Book.create([
      {
        title: 'Parable of the Talents',
        addDate: '2019-12-30',
        author: 'Octavia Butler',
        genre: 'Sci-Fi/Fantasy',
        readingList: user._id,
      },
      {
        title: 'Parable of the Sower',
        addDate: '2019-12-30',
        author: 'Octavia Butler',
        genre: 'Sci-Fi/Fantasy',
        readingList: user._id,
      }
    ]);
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/login')
      .send({ email: 'test@testing.com', password: 'password' });

    return agent
      .get('/api/v1/books')
      .then(res => {
        books.forEach(book => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(book)));
        });
      });
  });

  
});
