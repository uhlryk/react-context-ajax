var chai = require('chai');
var expect = chai.expect;
var Request = require('./dist/request').default;
var nock = require('nock');
describe("Test local and baseUrl ", function() {
  beforeEach(function(done) {
    nock('http://localhost:3000').get('/item').reply(200, {param : 'test'});
    done();
  });
  afterEach(function(done) {
    nock.cleanAll();
    done();
  });
  it("should connect to server url, where url is set in local", function(done) {
    var request = new Request();
    request.getRequest({
      url: 'http://localhost:3000/item',
      endCallback: function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      }
    });
  });
  it("should connect to server url, where base url is set", function(done) {
    var request = new Request({
      baseUrl: 'http://localhost:3000'
    });
    request.getRequest({
      url: '/item',
      endCallback: function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      }
    });
  });
  it("should return error when url no exist", function(done) {
    var request = new Request({
      baseUrl: 'http://localhost:3000'
    });
    request.getRequest({
      url: '/something',
      endCallback: function(err, res) {
        expect(err).to.exist;
        done();
      }
    });
  });
});
