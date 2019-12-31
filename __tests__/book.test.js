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

  beforeEach(async() => {
    book = await Book
      .create({
        title: 'Fledgling',
        addDate: '2019-12-30',
        author: 'Octavia Butler',
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
        title: 'Lilith\'s Brood',
        addDate: '2019-12-30',
        author: 'Octavia Butler',
        genre: ['Sci-Fi/Fantasy']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Lilith\'s Brood',
          addDate: expect.any(String),
          author: 'Octavia Butler',
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
          title: 'Fledgling',
          addDate: expect.any(String),
          author: 'Octavia Butler',
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
          title: 'Fledgling',
          author: 'Octavia Butler',
          addDate: expect.any(String),
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
          title: 'Bloodchild',
          author: 'Octavia Butler',
          addDate: expect.any(String),
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
          title: 'Bloodchild',
          author: 'Octavia Butler',
          addDate: expect.any(String),
          genre: ['Sci-Fi/Fantasy'],
          __v: 0
        });
      });

  });

  
});
