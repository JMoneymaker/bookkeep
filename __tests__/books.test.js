const { getPublisher, getBook, getBooks, getAuthor, getUser } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('book routes', () => {

  it('creates a book', async() => {
    const publisher = await getPublisher();
    const author = await getAuthor();
    const user = await getUser();
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ 
        email: user.email, 
        password: 'password123' });

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
    const books = await getBooks();

    return request(app)
      .get('/api/v1/books')
      .then(res => {
        books.forEach(book => {
          expect(res.body).toContainEqual(book);
        });
      });
  });

  it('finds a single book by id', async() => {
    const book = await getBook();

    return request(app)
      .get(`/api/v1/books/${book._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: book._id,
          publisherId: expect.any(String),
          authorId: expect.any(String),
          title: book.title,
          published: book.published,
          ISBN: book.ISBN,
          language: book.language,
          genre: book.genre,
          __v: 0
        });
      });
  });

  it('updates a book by id', async() => {
    const book = await getBook();
    const user = await getUser();
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ 
        email: user.email, 
        password: 'password123' });

    return agent
      .patch(`/api/v1/books/${book._id}`)
      .send({ title: 'Bloodchild' })
      .then(res => {
        expect(res.body).toEqual({
          _id: book._id,
          publisherId: expect.any(String),
          authorId: expect.any(String),
          title: 'Bloodchild',
          published: book.published,
          ISBN: book.ISBN,
          language: book.language,
          genre: book.genre,
          __v: 0
        });
      });
  });

  it('deletes a book by id', async() => {
    const book = await getBook();
    const user = await getUser();

    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ 
        email: user.email, 
        password: 'password123' });

    return agent
      .delete(`/api/v1/books/${book._id}`)
      .then(res => {
        expect(res.body).toEqual(book);
      });
  });
});
