const Book = require('./Book');

describe('Book Model', () => {
  it('Has a required userId', () => {
    const book = new Book();
    const { errors } = book.validateSync();
    expect(errors.readingList.message).toEqual('Path `readingList` is required.');
  });

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

  it('Has a required genre', () => {
    const book = new Book();
    const { errors } = book.validateSync();
    expect(errors.genre.message).toEqual('Path `genre` is required.');
  });

  it('Accepts only approved genres', () => {
    const book = new Book({
      readingList: 'somestring',
      title: 'Fledgling',
      author: 'Octavia Butler',
      genre: 'Sexy vampires'
    });

    const { errors } = book.validateSync();
    expect(errors.genre.message).toEqual('`Sexy vampires` is not a valid enum value for path `genre`.');
  });
});
