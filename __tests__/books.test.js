require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Book = require('../lib/models/Book');
const Publisher = require('../lib/models/Publisher');
let Author = require('../lib/models/Author');
const User = require('../lib/models/User');

describe('book routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let book;
  let publisher;
  let author;

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

  it('creates a book', async() => {
    await User.create({ 
      email: 'createOneTest@testing.com', 
      password: 'password' });
    
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ 
        email: 'createOneTest@testing.com', 
        password: 'password' });

    return agent
      .post('/api/v1/books')
      .send({
        publisherId: publisher._id,
        authorId: author._id,
        title: 'Lilith\'s Brood',
        published: 2004,
        ISBN: 'some isbn string',
        language: 'English',
        genre: ['Sci-Fi/Fantasy']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          publisherId: expect.any(String),
          authorId: expect.any(String),
          title: 'Lilith\'s Brood',
          published: 2004,
          ISBN: 'some isbn string',
          language: 'English',
          genre: ['Sci-Fi/Fantasy'],
          __v: 0
        });
      });
  });

  it('finds all books', async() => {
    return request(app)
      .get('/api/v1/books')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          publisherId: expect.any(String),
          authorId: expect.any(String),
          title: 'Fledgling',
          published: 2004,
          ISBN: 'some isbn string',
          language: 'English',
          genre: ['Sci-Fi/Fantasy'],
          __v: 0
        }]);
      });
  });

  it('finds a single book by id', async() => {
    return request(app)
      .get(`/api/v1/books/${book._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          publisherId: expect.any(String),
          authorId: expect.any(String),
          title: 'Fledgling',
          published: 2004,
          ISBN: 'some isbn string',
          language: 'English',
          genre: ['Sci-Fi/Fantasy'],
          __v: 0
        });
      });
  });

  it('updates a book by id', async() => {
    await User.create({ 
      email: 'updateOne@testing.com', 
      password: 'password' });
    
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ email: 'updateOne@testing.com', password: 'password' });

    return agent
      .patch(`/api/v1/books/${book._id}`)
      .send({ title: 'Bloodchild' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          publisherId: expect.any(String),
          authorId: expect.any(String),
          title: 'Bloodchild',
          published: 2004,
          ISBN: 'some isbn string',
          language: 'English',
          genre: ['Sci-Fi/Fantasy'],
          __v: 0
        });
      });

  });

  it('deletes a book by id', async() => {
    await User.create({ 
      email: 'deleteOne@testing.com', 
      password: 'password' });
    
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ email: 'deleteOne@testing.com', password: 'password' });

    return agent
      .patch(`/api/v1/books/${book._id}`)
      .send({ title: 'Bloodchild' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          publisherId: expect.any(String),
          authorId: expect.any(String),
          title: 'Bloodchild',
          published: 2004,
          ISBN: 'some isbn string',
          language: 'English',
          genre: ['Sci-Fi/Fantasy'],
          __v: 0
        });
      });

  });

});
