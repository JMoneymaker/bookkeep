require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Author = require('../lib/models/Author');
const Book = require('../lib/models/Book');
const Publisher = require('../lib/models/Publisher');

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
        ISBN: 'some isbn string',
        title: 'Fledgling',
        published: 2004,
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

  it('finds all authors', async() => {
    const authors = await Author
      .create([{
        name: 'N.K. Jemisin'
      }]);

    return request(app)
      .get('/api/v1/authors')
      .then(res => {
        authors.forEach(author => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(author)));
        });
      });
  });

  it('gets and author by id', async() => {
    return request(app)
      .get(`/api/v1/authors/${author._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Octavia Butler',
          id: expect.any(String),
          books: [{
            _id: book.id,
            publisherId: publisher.id,
            authorId: author.id,
            title: book.title
          }],
          __v: 0
        });
      });
  });

  it('updates an author by id', async() => {
    return request(app)
      .patch(`/api/v1/authors/${author._id}`)
      .send({ name: 'N.K. Jemisin' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'N.K. Jemisin',
          id: expect.any(String),
          books: [{
            _id: book.id,
            publisherId: publisher.id,
            authorId: author.id,
            title: book.title
          }],
          __v: 0
        });
      });
  });

  it('deletes an author by id', async() => {
    return request(app)
      .delete(`/api/v1/authors/${author._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Octavia Butler',
          id: expect.any(String),
          books: [{
            _id: book.id,
            publisherId: publisher.id,
            authorId: author.id,
            title: book.title
          }],
          __v: 0
        });
      });
  });
});
