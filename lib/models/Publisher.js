const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  city: String,
  state: String,
  country: String
});

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: [addressSchema]
});

schema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'bookId'
});

module.exports = mongoose.model('Publisher', schema);
