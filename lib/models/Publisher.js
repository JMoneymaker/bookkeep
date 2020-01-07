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
}, {
  toJSON: {
    virtuals: true
  }
});

schema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'publisherId'
});

module.exports = mongoose.model('Publisher', schema);
