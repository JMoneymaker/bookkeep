const Book = require('./Book');

describe('Book Model', () => {

  it('Has a required title', () => {
    const book = new Book();
    const { errors } = book.validateSync();
    expect(errors.title.message).toEqual('Path `title` is required.');
  });

  it('Has a required author', () => {
    const book = new Book();
    const { errors } = book.validateSync();
    expect(errors.author.message).toEqual('Path `author` is required.');
  });

  it('Has a required ISBN', () => {
    const book = new Book();
    const { errors } = book.validateSync();
    expect(errors.ISBN.message).toEqual('Path `ISBN` is required.');
  });
});
