const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  readingList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  addDate: {
    type: Date,
    required: true
  },
  readDate: {
    type: Date,
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    enum: ['Sci-Fi/Fantasy', 'Romance', 'Mystery', 'Horror', 'Literature', 'Classics', 'Poetry', 'Plays', 'Biography', 'History', 'Sociology', 'Politics', 'Art', 'Westerns', 'Nautical', 'Graphic Novel', 'Manga', 'Comics', 'Physics', 'Chemistry', 'Astronomy', 'Natural History', 'Humor', 'Business', 'Computer Science', 'Cooking', 'Gardening', 'Anthropology']
  },
  notes: String
});

module.exports = mongoose.model('Book', schema);
