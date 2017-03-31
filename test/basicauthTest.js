const assert = require('assert');
const basicAuth = require('../src/basicauth');

describe('Basicauth', () => {
    it('should success', (done) => {

        const auth = basicAuth('user', 'pass');
        const req = {
          headers : {
            authorization : 'Basic dXNlcjpwYXNz'
          }
        };
        const next = () => {
          assert.equal(res.getStatus(), 200);
          done();
        };
        const res = new ResObject(next);
        auth(req, res, next)

        // then
        // assert.deepEqual(pairs, [['A', 10], ['B', 20]]);
    });

    it('should fail', (done) => {

        const auth = basicAuth('user', 'pass');
        const req = {
          headers : {
            authorization : 'Basic dXNlcsjpwYXNz'
          }
        };
        const next = () => {
          assert.equal(res.getStatus(), 401);
          assert.equal(res.getMessage(), 'Access denied');
          done();
        };
        const res = new ResObject(next);
        auth(req, res, next)

        // then
        // assert.deepEqual(pairs, [['A', 10], ['B', 20]]);
    });
});

function ResObject (next) {
  this.header = null;
  this.callback = next;
  this.httpstatus = 200;
  this.message = null;
};

ResObject.prototype.setHeader = function (header) {
  this.header = header;
};

ResObject.prototype.status = function(httpstatus) {
  this.httpstatus = httpstatus
  return this;
};

ResObject.prototype.send = function(message) {
  this.message = message
  this.callback();
};

ResObject.prototype.getStatus = function() {
  return this.httpstatus;
};

ResObject.prototype.getMessage = function() {
  return this.message;
};