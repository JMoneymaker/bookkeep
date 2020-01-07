require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Author = require('../lib/models/Author');
const Book = require('../lib/models/Book');

describe('author routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let author;
  let book;
  let publisher;

  beforeEach(async() => {
    author = await Author
      .create({
        name: 'Octavia Butler'
      });

    book = await Book
      .create({
        publisherId: mongoose.Types.ObjectId(),
        authorId: mongoose.Types.ObjectId(),
        title: 'Fledgling',
        published: 2004,
        ISBN: 'some isbn string',
        language: 'English',
        genre: ['Sci-Fi/Fantasy']
      });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an author', () => {
    const agent = request.agent(app);

    return agent
      .post('/api/v1/authors')
      .send({
        name: 'Octavia Butler'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Octavia Butler',
          id: expect.any(String),
          __v: 0
        });
      });
  });
});
