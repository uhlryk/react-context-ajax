var chai = require("chai");
var expect = chai.expect;

var Request = require('./dist/request').default;

var server = require('./helper/server.js');

var app, query, body, params;
describe("Check server ", function() {
  //server listening on http://localhost:3000
  before(function(done) {
    app = server(function(_query, _body, _params){
      query= _query;
      body = _body;
      params = _params;
    }).listen(3000, function() {
      done();
    });
  });
  it("should return status code 200 at get request", function(done) {
    var request = new Request();
    request.getRequest('http://localhost:3000/item', {}, function(err, res) {
      expect(err).to.not.exist;
      expect(res.status).to.be.equal(200);
      done();
    })
  });
  it("should return status code 400 at get request", function(done) {
    var request = new Request();
    request.getRequest('http://localhost:3000/error400', {}, function(err, res) {

      expect(err.status).to.be.equal(400);
      expect(res.status).to.be.equal(400);
      done();
    })
  });
  it("should return status code 500 at get request", function(done) {
    var request = new Request();
    request.getRequest('http://localhost:3000/error500', {}, function(err, res) {
      expect(err.status).to.be.equal(500);
      expect(res.status).to.be.equal(500);
      done();
    })
  });
  after(function(done){
    app.close();
    done();
  });
});
