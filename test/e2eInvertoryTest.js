'use strict';

const request = require('supertest');
const express = require('express');
const inMemoryStockRepository = require('../src/in_memory_stock_repository')();

const app = require('../src/app')(inMemoryStockRepository);

describe('Book invertory', () => {
  it ('allows to stock up the items', done => {
    const sendData = {isbn:323, count: 1};
    request(app)
      .post('/stock')
      .send(sendData)
      .expect(200)
      .expect('Content-Type', /json/, done)
  });
  it ('get all items', done => {
    request(app)
      .get('/stock')
      .expect(200)
      .expect('Content-Type', /json/, done)
  });
});