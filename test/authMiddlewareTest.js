'use strict';

const request = require('supertest');
const express = require('express');
const inMemoryStockRepository = require('../src/in_memory_stock_repository')();
const authMiddleware = require('../src/basicauth')('user', 'pass');
const app = require('../src/app')(inMemoryStockRepository, authMiddleware);

describe('Auth test', () => {
  it ('should fail on authorization', () => request(app)
      .get('/stock')
      .auth('user', 'bad pass')
      .expect(401)
  );
});