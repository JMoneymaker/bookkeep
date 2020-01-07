const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: Date,
  pob: String
}, {
  toJSON: {
    virtuals: true
  }
});

schema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'authorId'
});

module.exports = mongoose.model('Author', schema);
