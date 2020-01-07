const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  publisherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  published: {
    type: Number,
    min: 1800,
    max: 9999,
    required: true
  },
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // },
  ISBN: {
    type: String,
    required: true
  },
  language: String,
  genre: [String],
});

module.exports = mongoose.model('Book', schema);
