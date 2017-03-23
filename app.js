/*jslint node: true */
'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const stockRepository = require('./stock_repository');


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
    .then(function (data) {
      res.json(data)})
    .catch(next);
});

app.get('/getAll', function (req, res, next) {
  stockRepository.getAll()
    .then(function (data) {
      res.json(data)})
    .catch(next);
});

app.post('/get', function (req, res, next) {
  stockRepository.get(req.body.isbn)
    .then(function (data) {
      res.json(data)})
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

module.exports = app;