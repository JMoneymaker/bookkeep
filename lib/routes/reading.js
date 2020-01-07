const { Router } = require('express');
const Reading = require('../models/Reading');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reading
      .create(req.body)
      .then(reading => res.send(reading))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reading
      .find()
      .limit(100)
      .then(reading => res.send(reading))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reading
      .findById(req.params.id)
      .then(reading => res.send(reading))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Reading
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(reading => res.send(reading))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Reading
      .findByIdAndDelete(req.params.id)
      .then(reading => res.send(reading))
      .catch(next);
  });

