/*jslint node: true */
'use strict';

const stockRepository = require('./stock_repository');

const app = require('./app')(stockRepository);

app.listen(3000, () => console.log('Example app listening on port 3000!'));