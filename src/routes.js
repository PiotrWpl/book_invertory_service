/*jslint node: true */
'use strict';

module.exports = stockRepository => {

  return {
    stockUp : (req, res, next) => {
      stockRepository.stockUp(req.body.isbn, req.body.count)
        .then(data => res.json(data))
        .catch(next);
    },
    findAll : (req, res, next) => {
      stockRepository.findAll()
        .then(data => res.json(data))
        .catch(next);
    },
    getCount : (req, res, next) => {
      stockRepository.getCount(Number(req.params.isbn))
        .then(count => {
          if (count) {
            res.json({count});
          } else {
            const err = new Error('No book with isbn');
            err.status = 404;
            next(err);
          }
        })
        .catch(next);
    }
  }

};