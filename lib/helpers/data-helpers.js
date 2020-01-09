require('dotenv').config();
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const seed = require('./seed');
const Publisher = require('../models/Publisher');
const Author = require('../models/Author');
const Book = require('../models/Book');
const User = require('../models/User');
const Shelf = require('../models/Shelf');

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seed({ publisher: 3, books: 25, authors: 15,  users: 1, shelfs: 10 });
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepare = doc => JSON.parse(JSON.stringify(doc));

const createGetters = Model => {
  const modelName = Model.modelName;

  return {
    [`get${modelName}`]: (query) => Model.findOne(query).then(prepare),
    [`get${modelName}s`]: (query) => Model.find(query).then(docs => docs.map(prepare))
  };
};

module.exports = {
  ...createGetters(Publisher),
  ...createGetters(Author),
  ...createGetters(Book),
  ...createGetters(User),
  ...createGetters(Shelf)
};
