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

schema.virtual('book', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'authorId'
});

schema.statics.findBooksByAuthorId = function(id) {
  return this.model('Book')
    .find({ authorId: id });
};

module.exports = mongoose.model('Author', schema);
