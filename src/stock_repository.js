/*jslint node: true */
'use strict';

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/testapp';

const collectionPromise = MongoClient.connect(url, {bufferMaxEntries: 0})
    .then(db => db.collection('books'))
    .catch(err => console.error(err.stack));

exports.stockUp = (isbn, count) => {
  const data = {isbn, count};

  return collectionPromise
    .then(collection => collection.updateOne({isbn}, data, {upsert: true}))
    .then(() => data);
};

exports.findAll = () => {
  return collectionPromise
    .then(collection => collection.find().toArray());
};

exports.getCount = (isbn) => {
  return collectionPromise
    .then(collection => collection.find({isbn}).limit(1).next())
    .then(result => result ? result.count : null);
};