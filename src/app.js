'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const error = require('./error');
const middleware = require('./middleware');

module.exports = (stockRepository, authMiddleware) => {
  const app = express();
  const routes = require('./routes')(stockRepository);

  app.use(middleware.logRequest);
  app.use(authMiddleware);

  app.use(bodyParser.json());

  app.get('/favicon.ico', routes.getFavicon);
  app.post('/stock', routes.stockUp);
  app.get('/stock', routes.findAll);
  app.get('/stock/:isbn', routes.getCount);

  app.use(error.clientError);
  app.use(error.serverError);

  return app;
};