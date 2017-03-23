/*jslint node: true */
'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017/testapp';

var collection = null;

MongoClient.connect(url, function(err, db) {
  collection = db.collection('books');
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

app.post('/stock', function (req, res) {
  var data = {
    isbn : req.body.isbn,
    count : req.body.count
  };

  collection.updateOne({isbn:data.isbn}, data, {upsert: true}, function(err, doc) { res.json(data);});
});

app.get('/getAll', function (req, res) {
  collection.find().toArray(function(err, docs) {
    res.json(docs);
  });
});

app.post('/get', function (req, res) {
  var data = {
    isbn : req.body.isbn
  };
  collection.find({isbn:data.isbn}).toArray(function(err, docs) {
    res.json(docs);
  });
});

app.get('/err', function (req, res) {
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