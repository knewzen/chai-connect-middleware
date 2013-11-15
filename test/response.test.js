/* global describe, it, before, expect */

var Response = require('../lib/response');

describe('Response', function() {
  
  describe('constructor', function() {
    var res = new Response();
  
    it('should be constructed with default properties', function() {
      expect(Object.keys(res)).to.have.length(4);
      expect(res.statusCode).to.equal(200);
    });
  });
  
  describe('#setHeader', function() {
    var res = new Response();
    res.setHeader('Content-Type', 'application/json');
  
    it('should get set header', function() {
      expect(res.getHeader('Content-Type')).to.equal('application/json');
    });
  });
  
  describe('#end', function() {
    var res;
  
    before(function(done) {
      res = new Response(function() {
        process.nextTick(done);
      });
      res.end();
    });
  
    it('should get set status and not body', function() {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.undefined;
    });
  });
  
  describe('#end with data', function() {
    var res;
  
    before(function(done) {
      res = new Response(function() {
        process.nextTick(done);
      });
      res.end('Hello');
    });
  
    it('should get set status and body', function() {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.equal('Hello');
    });
  });
  
});
