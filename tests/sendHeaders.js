var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var Request = require('./dist/request').default;
var nock = require('nock');
describe("Test if headers are send ", function() {
  beforeEach(function(done) {
    nock('http://localhost:3000').matchHeader('token', '123456789').get('/item').reply(200, {param : 'test'});
    done();
  });
  afterEach(function(done) {
    nock.cleanAll();
    done();
  });
  it("should return error when request doesn't send any header", function(done) {
    var request = new Request();
    request.getRequest({
      url: 'http://localhost:3000/item',
      endCallback: function (err, res) {
        expect(err).to.be.exist;
        expect(err.status).to.be.equal(404);
        nock.isDone();
        done();
      }
    });
  });
  it("should return error when request doesn't send expected header", function(done) {
    var request = new Request();
    request.addHeader('test','ffdsffsdf');
    request.getRequest({
      url: 'http://localhost:3000/item',
      endCallback: function (err, res) {
        expect(err).to.be.exist;
        expect(err.status).to.be.equal(404);
        nock.isDone();
        done();
      }
    });
  });
  it("should success when we set global correct header", function(done) {
    var request = new Request();
    request.addHeader('token','123456789');
    request.getRequest({
      url: 'http://localhost:3000/item',
      endCallback: function (err, res) {

        expect(res.status).to.be.equal(200);
        nock.isDone();
        done();
      }
    });
  });
  it("should return error when remove global correct header before send", function(done) {
    var request = new Request();
    request.addHeader('token','123456789');
    request.removeHeader('token');
    request.getRequest({
      url: 'http://localhost:3000/item',
      endCallback: function (err, res) {
        expect(err).to.be.exist;
        expect(err.status).to.be.equal(404);
        nock.isDone();
        done();
      }
    });
  });
  it("should success when we override global wrong header to correct before send", function(done) {
    var request = new Request();
    request.addHeader('token','abcdefg');
    request.addHeader('token','123456789');
    request.getRequest({
      url: 'http://localhost:3000/item',
      endCallback: function (err, res) {
        expect(res.status).to.be.equal(200);
        nock.isDone();
        done();
      }
    });
  });
  it("should success when we set local correct header", function(done) {
    var request = new Request();
    request.getRequest({
      url: 'http://localhost:3000/item',
      headers: {
        token: '123456789'
      },
      endCallback: function (err, res) {
        expect(res.status).to.be.equal(200);
        nock.isDone();
        done();
      }
    });
  });
  it("should success when we override wrong global header by local correct header", function(done) {
    var request = new Request();
    request.addHeader('token','abcdefg');
    request.getRequest({
      url: 'http://localhost:3000/item',
      headers: {
        token: '123456789'
      },
      endCallback: function (err, res) {
        expect(res.status).to.be.equal(200);
        nock.isDone();
        done();
      }
    });
  });
  it("should return error when remove global correct header in local request before send", function(done) {
    var request = new Request();
    request.addHeader('token','123456789');
    request.getRequest({
      url: 'http://localhost:3000/item',
      headers: {
        token: null
      },
      endCallback: function (err, res) {
        expect(err).to.be.exist;
        expect(err.status).to.be.equal(404);
        nock.isDone();
        done();
      }
    });
  });
});
