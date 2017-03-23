/*jslint node: true */
'use strict';

var express = require('express')
var app = express()

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

app.get('/', function (req, res) {
  console.log('Hello World')
  res.send('Hello World!')
})

app.get('/err', function (req, res) {
  throw new Error('Forced error');
})

app.use(function (req, res, next) {
  var err = new Error('Not found');
  err.status = 404;

  next(err);
});

app.use(function (err, req, res, next) {
  var status = err.status || 500;
  console.error(status + " | " + err.stack)
  res.status(status).send(err.message);
  next();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})