const { Router } = require('express');
const User = require('../models/User');
const Shelf = require('../models/Shelf');

module.exports = Router()
  .post('/', (req, res, next) => {
    User
      .create(req.body)
      .then(user => res.send(user))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    User
      .find()
      .then(user => res.send(user))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .populate('shelf', { title: true })
      .then(user => res.send(user))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Promise.all([
      User
        .findByIdAndDelete(req.params.id),
        
      Shelf
        .deleteMany({ userId: req.params.id })
    ])
      .then(([user]) => {

        res.send(user);
      })
      .catch(next);
  });

