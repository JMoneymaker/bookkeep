const { Router } = require('express');
const Shelf = require('../models/Shelf');

module.exports = Router()
  .post('/', (req, res, next) => {
    Shelf
      .create(req.body)
      .then(shelf => res.send(shelf))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Shelf
      .find()
      .limit(100)
      .then(shelf => res.send(shelf))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Shelf
      .findById(req.params.id)
      .then(shelf => res.send(shelf))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Shelf
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(shelf => res.send(shelf))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Shelf
      .findByIdAndDelete(req.params.id)
      .then(shelf => res.send(shelf))
      .catch(next);
  });

