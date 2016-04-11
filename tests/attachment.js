var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var Request = require('./dist/request').default;
var nock = require('nock');
describe("Attachments test ", function() {
  beforeEach(function(done) {
    nock('http://localhost:3000')
      .matchHeader('content-type', function (val) {
        return val.indexOf('multipart/form-data') >= 0;
      })
      .post('/item')
      .reply(200, {param : 'test'});
    done();
  });
  afterEach(function(done) {
    nock.cleanAll();
    done();
  });
  it("should success when server get fields and receive multipart/form-data; content-type", function(done) {
    var request = new Request();
    request.postRequest({
      url: 'http://localhost:3000/item',
      fields: {
        category: 'Tobi',
        project: 11
      },
      endCallback: function (err, req, res) {
        expect(err).to.be.not.exist;
        expect(res.status).to.be.equal(200);
        nock.isDone();
        done();
      }
    });
  });
  it("should success when server get attachment [string] without fields and receive multipart/form-data; content-type", function(done) {
    var request = new Request();
    request.postRequest({
      url: 'http://localhost:3000/item',
      attachments: {
        file: './tests/attachment/test.txt'
      },
      endCallback: function (err, req, res) {
        expect(err).to.be.not.exist;
        expect(res.status).to.be.equal(200);
        nock.isDone();
        done();
      }
    });
  });
  it("should success when server get attachment [object with path] without fields and receive multipart/form-data; content-type", function(done) {
    var request = new Request();
    request.postRequest({
      url: 'http://localhost:3000/item',
      attachments: {
        file: {
          path: './tests/attachment/test.txt'
        }
      },
      endCallback: function (err, req, res) {
        expect(err).to.be.not.exist;
        expect(res.status).to.be.equal(200);
        nock.isDone();
        done();
      }
    });
  });
  it("should success when server get attachment [object with path and filename] without fields and receive multipart/form-data; content-type", function(done) {
    var request = new Request();
    request.postRequest({
      url: 'http://localhost:3000/item',
      attachments: {
        file: {
          path: './tests/attachment/test.txt',
          filename: 'newname.txt'
        }
      },
      endCallback: function (err, req, res) {
        expect(err).to.be.not.exist;
        expect(res.status).to.be.equal(200);
        nock.isDone();
        done();
      }
    });
  });
  it("should success when server get fields, attachments and receive multipart/form-data; content-type", function(done) {
    var request = new Request();
    request.postRequest({
      url: 'http://localhost:3000/item',
      fields: {
        category: 'Tobi',
        project: 11
      },
      attachments: {
        file: './tests/attachment/test.txt'
      },
      endCallback: function (err, req, res) {
        expect(err).to.be.not.exist;
        expect(res.status).to.be.equal(200);
        nock.isDone();
        done();
      }
    });
  });
});
