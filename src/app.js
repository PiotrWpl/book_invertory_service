/*jslint node: true */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

module.exports = stockRepository => {
  const app = express();

  app.use(bodyParser.json());

  app.post('/stock', (req, res, next) => {
    stockRepository.stockUp(req.body.isbn, req.body.count)
      .then(data => res.json(data))
      .catch(next);
  });

  app.get('/stock', (req, res, next) => {
    stockRepository.findAll()
      .then(data => res.json(data))
      .catch(next);
  });

  app.get('/stock/:isbn', (req, res, next) => {
    stockRepository.get(Number(req.params.isbn))
      .then(data => {
        if (data) {
          res.json(data)
        } else {
          const err = new Error('No book with isbn');
          err.status = 404;
          next(err);
        }
      })
      .catch(next);
  });

  app.get('/err', (req, res, next) => {
    throw new Error('Forced error');
  });

  app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;

    next(err);
  });

  app.use((err, req, res, next) => {
    const status = err.status || 500;
    console.error(status + " | " + err.stack);
    res.status(status).send(err.message);
    next();
  });

  return app;
};