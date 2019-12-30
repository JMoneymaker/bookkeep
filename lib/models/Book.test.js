const Book = require('./Book');

describe('Book Model', () => {
  it('Has a required title', () => {
    const book = new Book({
      author: 'Octavia Butler',
      genre: 'Sci-Fi/Fantasy'
    });

    const { errors } = book.validateSync();
    expect(errors.title.message).toEqual('Path `title` is required.');
  });

  it('Has a required author', () => {
    const book = new Book({
      title: 'Fledgling',
      genre: 'Sci-Fi/Fantasy'
    });

    const { errors } = book.validateSync();
    expect(errors.author.message).toEqual('Path `author` is required.');
  });

  it('Has a required genre', () => {
    const book = new Book({
      title: 'Fledgling',
      author: 'Octavia Butler'
    });
    const { errors } = book.validateSync();
    expect(errors.genre.message).toEqual('Path `genre` is required.');
  });

  it('Accepts only approved genres', () => {
    const book = new Book({
      title: 'Fledgling',
      author: 'Octavia Butler',
      genre: 'Sexy vampires'
    });

    const { errors } = book.validateSync();
    expect(errors.genre.message).toEqual('`Sexy vampires` is not a valid enum value for path `genre`.');
  });
});
