/*jslint node: true */
'use strict';

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/testapp';

var collectionPromise = MongoClient.connect(url, {bufferMaxEntries: 0})
    .then(db => db.collection('books'))
    .catch(err => console.error(err.stack));

exports.stockUp = function (isbn, count) {
  const data = {isbn, count};

  return collectionPromise
    .then(collection => collection.updateOne({isbn}, data, {upsert: true}))
    .then(() => data);
};

exports.findAll = function () {
  return collectionPromise
    .then(collection => collection.find().toArray());
};

exports.getCount = function () {
  return collectionPromise
    .then(collection => collection.find().toArray().length);
};

exports.get = function (isbn) {
  return collectionPromise
    .then(collection => collection.find({isbn}).limit(1).next());
};