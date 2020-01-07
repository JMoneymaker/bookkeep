const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router() 
  .post('/', (req, res, next) => {
    Author
      .create(req.body)
      .then(author => res.send(author))
      .catch(next);
  });
