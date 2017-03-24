/*jslint node: true */
'use strict';

const request = require('supertest');
const express = require('express');

const app = require('../src/app');

describe('Book invertory', () => {
  it ('allows to stock up the items', done => {
    var sendData = {isbn:323, count: 1};
    request(app)
      .post('/stock')
      .send(sendData)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(sendData, done);
  });
});