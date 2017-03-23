/*jslint node: true */
'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017/testapp';

var collectionPromise = MongoClient.connect(url).then(function (db) {
  return db.collection('books');
}).catch(function (err) {
  console.error(err.stack);
});

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

app.get('/', function (req, res) {
  console.log('Hello World');
  res.send('Hello World!');
});

app.post('/stock', function (req, res, next) {
  var data = {
    isbn : req.body.isbn,
    count : req.body.count
  };

  collectionPromise.then(function(collection) {
    return collection.updateOne({isbn:data.isbn}, data, {upsert: true});
  }).then(function() {
    res.json(data);
  }).catch(next);
});

app.get('/getAll', function (req, res, next) {
  collectionPromise.then(function (collection) {
    return collection.find().toArray();
  }).then(function(docs) {
      res.json(docs);
  }).catch(next);
});

app.post('/get', function (req, res, next) {
  var data = {
    isbn : req.body.isbn
  };
  collectionPromise.then(function (collection) {
    return collection.find({isbn:data.isbn}).toArray();
  }).then(function(docs) {
      res.json(docs);
  }).catch(next);
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