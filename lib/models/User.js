const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, 'This email is taken']
  },
  passwordHash: {
    type: String,
    required: true
  },
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

module.exports = mongoose.model('User', schema);
