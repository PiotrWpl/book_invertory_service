/*jslint node: true */
'use strict';

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/testapp';

var collectionPromise = MongoClient.connect(url, {bufferMaxEntries: 0})
    .then(function (db) {
      return db.collection('books')})
    .catch(function (err) {
      console.error(err.stack);
    });

exports.stockUp = function (isbn, count) {
  const data = {isbn, count};

  return collectionPromise
    .then(function(collection) {
      return collection.updateOne({isbn}, data, {upsert: true})})
    .then(function() {
      return data}
    );
};

exports.findAll = function () {
  return collectionPromise
    .then(function (collection) {
      return collection.find().toArray()
    });
};

exports.getCount = function () {
  return collectionPromise
    .then(function (collection) {
      return collection.find().toArray().length;
    });
};

exports.get = function (isbn) {
  return collectionPromise
    .then(function (collection) {
      return collection.find({isbn}).limit(1).next();
    });
};