'use strict';

const assert = require('assert');
const sum = require('./sum');

describe('Math in JS', () => {
  it ('should support addition',  done => {
    setTimeout(() => {
      assert.equal(sum(1,1), 2);
      done();
    }, 100);
  });
});