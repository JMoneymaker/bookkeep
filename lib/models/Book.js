const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: [true, 'This book is already on your list']
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    enum: ['Sci-Fi/Fantasy', 'Romance', 'Mystery', 'Horror', 'Literature', 'Classics', 'Poetry', 'Play', 'Biography', 'History', 'Sociology', 'Politics', 'Art', 'Westerns', 'Nautical', 'Graphic Novel', 'Manga', 'Comics', 'Physics', 'Chemistry', 'Astronomy', 'Natural History', 'Humor', 'Business', 'Computer Science', 'Cooking', 'Gardening', 'Anthropology']
  }
});

module.exports = mongoose.model('Book', schema);
