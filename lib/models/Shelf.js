const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  dateAdded: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },         
  dateRead: Date
});

module.exports = mongoose.model('Shelf', schema);
