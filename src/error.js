/*jslint node: true */
'use strict';

module.exports = {
  clientError : (req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;

    next(err);
  },
  serverError : (err, req, res, next) => {
    const status = err.status || 500;
    console.error(status + " | " + err.stack);
    res.status(status).send(err.message);

    next();
  }
};