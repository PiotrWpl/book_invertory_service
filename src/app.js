/*jslint node: true */
'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var stockRepository;

function logRequest (req, res, next) {
  console.log('logRequest', new Date());
  next();
};

function authRequest (req, res, next) {
  console.log('authRequest', new Date());
  next();
};

app.use(logRequest);
app.use(authRequest);
app.use(bodyParser.json());

app.post('/stock', function (req, res, next) {
  stockRepository.stockUp(req.body.isbn, req.body.count)
    .then(data => res.json(data))
    .catch(next);
});

app.get('/stock', function (req, res, next) {
  stockRepository.findAll()
    .then(data => res.json(data))
    .catch(next);
});

app.get('/stock/:isbn', function (req, res, next) {
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

app.get('/err', function (req, res, next) {
  throw new Error('Forced error');
});

app.use(function (req, res, next) {
  const err = new Error('Not found');
  err.status = 404;

  next(err);
});

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  console.error(status + " | " + err.stack);
  res.status(status).send(err.message);
  next();
});

module.exports = function (injectedRepository) {
  stockRepository = injectedRepository;
  return app;
};