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

schema.virtual('book', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'publisherId'
});

schema.statics.findBooksByPublisherId = function(id) {
  return this.model('Book')
    .find({ publisherId: id });
};

module.exports = mongoose.model('Publisher', schema);
