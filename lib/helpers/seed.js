const chance = require('chance').Chance();
const Publisher = require('../models/Publisher');
const Author = require('../models/Author');
const Book = require('../models/Book');
const User = require('../models/User');
const Reading = require('../models/Reading');

module.exports = async({ publisher = 3, books = 25, authors = 15,  users = 1, readings = 10 } = {}) => {
  const publishers = await Publisher.create([...Array(publisher)].map(() => ({
    name: chance.name(),
    address: [{
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }]
  })));

  const createdAuthors = await Author.create([...Array(authors)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pob: chance.city(),
  })));

  const createdBooks = await Book.create([...Array(books)].map(() => ({
    title: chance.name(),
    published: chance.year(),
    ISBN: chance.string(),
    language: chance.word(),
    genre: chance.word(),
    publisherId: chance.pickone(publishers.map(publisher => publisher._id)),
    authorId: chance.pickone(createdAuthors.map(authors => authors._id))
  })));

  const createdUsers = await User.create([...Array(users)].map(() => ({
    email: chance.email(),
    password: 'password123',
  })));

  await Reading.create([...Array(readings)].map(() => ({
    dateAdded: chance.date(),
    rating: chance.pickone([0, 1, 2, 3, 4, 5]),
    bookId: chance.pickone(createdBooks.map(books => books._id)),
    userId: chance.pickone(createdUsers.map(users => users._id))
  })));
};



