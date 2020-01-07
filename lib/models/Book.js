const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  publisherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher',
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  published: {
    type: Number,
    max: 9999,
    required: true
  },
  ISBN: {
    type: String,
    required: true
  },
  language: String,
  genre: [String],
});

module.exports = mongoose.model('Book', schema);
