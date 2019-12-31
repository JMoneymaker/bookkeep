const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  addDate: {
    type: Date,
    required: true
  },
  readDate: Date,
  genre: [String],
});

module.exports = mongoose.model('Book', schema);
