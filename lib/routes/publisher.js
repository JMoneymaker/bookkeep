const { Router } = require('express');
const Publisher = require('../models/Publisher');
// const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', (req, res, next) => {
    Publisher
      .create(req.body)
      .then(publisher => res.send(publisher))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Publisher
      .find()
      .then(publisher => res.send(publisher))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Publisher
      .findById(req.params.id)
      .populate('books', { title: true })
      .then(publisher => res.send(publisher))
      .catch(next);
  });

