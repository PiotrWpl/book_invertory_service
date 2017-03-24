'use strict';

module.exports = {
  logRequest : (req, res, next) => {
    console.log("Log request");
    next();
  },
  auth : (req, res, next) => {
    console.log("Auth request");
    next();
  }
};