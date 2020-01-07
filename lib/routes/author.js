const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router() 
  .post('/', (req, res, next) => {
    Author
      .create(req.body)
      .then(author => res.send(author))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Author
      .find()
      .then(authors => res.send(authors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Author
      .findById(req.params.id)
      .populate('books', { title: true, publisherId: true })
      .then(author => res.send(author))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Author
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('books', { title: true, publisherId: true })
      .then(author => res.send(author))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Author
      .findByIdAndDelete(req.params.id)
      .populate('books', { title: true, publisherId: true })
      .then(author => res.send(author))
      .catch(next);
  });
