const { Router } = require('express');
const Reader = require('../models/User');
const Reading = require('../models/Reading');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reader
      .create(req.body)
      .then(reader => res.send(reader))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reader
      .find()
      .then(reader => res.send(reader))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reader
      .findById(req.params.id)
      .populate('readings', { title: true })
      .then(reader => res.send(reader))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    Promise.all([Reader
      .findByIdAndDelete(req.params.id),

    Reading.deleteMany({ userId: req.params.id })
    ]).then(([reader]) => res.send(reader))
      .catch(next);
  });

