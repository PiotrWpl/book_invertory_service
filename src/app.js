/*jslint node: true */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const error = require('./error');

module.exports = stockRepository => {
  const app = express();
  const routes = require('./routes')(stockRepository);

  app.use(bodyParser.json());

  app.post('/stock', routes.stockUp);
  app.get('/stock', routes.findAll);
  app.get('/stock/:isbn', routes.getCount);

  app.use(error.clientError);
  app.use(error.serverError);

  return app;
};