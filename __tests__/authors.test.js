const { getBooks, getAuthor, getAuthors } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

const Book = require('../lib/models/Book');

describe('author routes', () => {

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
    const authors = await getAuthors();

    return request(app)
      .get('/api/v1/authors')
      .then(res => {
        authors.forEach(author => {
          expect(res.body).toContainEqual(author);
        });
      });
  });

  it('gets an author by id', async() => {
    const author = await getAuthor();
    const books = await getBooks({ authorId: author._id });

    return request(app)
      .get(`/api/v1/authors/${author._id}`)
      .then(res => {
        books.forEach(book => {
          expect(res.body.book).toContainEqual({
            _id: book._id,
            authorId: author._id,
            publisherId: expect.any(String),
            title: book.title 
          });
        });
        expect(res.body).toEqual({
          _id: author._id,
          name: author.name,
          pob: author.pob,
          dob: author.dob,
          id: expect.any(String),
          book: expect.any(Array),
          __v: 0
        });
      });
  });

  it('updates an author by id', async() => {
    const author = await getAuthor();
    const books = await getBooks({ authorId: author._id });

    return request(app)
      .patch(`/api/v1/authors/${author._id}`)
      .send({ name: 'N.K. Jemisin' })
      .then(res => {
        books.forEach(book => {
          expect(res.body.book).toContainEqual({
            _id: book._id,
            authorId: author._id,
            publisherId: expect.any(String),
            title: book.title 
          });
        });
        expect(res.body).toEqual({
          _id: author._id,
          name: 'N.K. Jemisin',
          pob: author.pob,
          dob: author.dob,
          id: expect.any(String),
          book: expect.any(Array),
          __v: 0
        });
      });
  });

  it('will delete an author with no books', async() => {
    const author = await getAuthor();
    await Book.deleteMany({ authorId: author._id });

    return request(app)
      .get('/api/v1/authors')
      .then(res => {
        expect(res.body).toContainEqual(author);
      });
  });


  it('does not delete a publisher that has books', async() => {
    const author = await getAuthor();

    return request(app)
      .delete(`/api/v1/authors/${author._id}`)
      .then(res => {
        expect(res.body.message).toEqual(
          'This author has books and cannot be deleted.');
      });
  });
});
