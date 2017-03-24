/*jslint node: true */
'use strict';

const stockRepository = require('./stock_repository');

var app = require('./app')(stockRepository);

app.listen(3000, () => console.log('Example app listening on port 3000!'));