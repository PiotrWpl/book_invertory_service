'use strict';

const stockRepository = require('./stock_repository');
const authMiddleware = require('./basicauth')('admin', 'pass');
const jwtAuth = require('./jwt-auth')('supersecretkey');

const app = require('./app')(stockRepository, jwtAuth);
const port = process.env.PORT || 3001;

app.listen(port, () => console.log('Example app listening on port ' + port));