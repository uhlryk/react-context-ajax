var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var Request = require('./dist/request').default;
var nock = require('nock');
describe("Test callbacks ", function() {
  beforeEach(function(done) {
    nock('http://localhost:3000').get('/item').reply(200, {param : 'test'});
    done();
  });
  afterEach(function(done) {
    nock.cleanAll();
    done();
  });
  it("should trigger local callback when no global callback", function(done) {
    var callback = sinon.spy();
    var request = new Request();
    request.getRequest({
      url: 'http://localhost:3000/item',
      endCallback : callback
    });
    setTimeout(function(){
      expect(callback.called).to.be.equal(true);
      expect(callback.args[0][0]).to.not.exist;//callback.args[0][0] err
      expect(callback.args[0][1].body.param).to.be.equal('test');//callback.args[0][1] res
      nock.isDone();
      done();
    },100);
  });
  it("should trigger global callback when no local callback", function(done) {
    var callback = sinon.spy();
    var request = new Request({
      callback: callback
    });
    request.getRequest({ url: 'http://localhost:3000/item'});
    setTimeout(function(){
      expect(callback.called).to.be.equal(true);
      expect(callback.args[0][0]).to.not.exist;//callback.args[0][0] err
      expect(callback.args[0][1].body.param).to.be.equal('test');//callback.args[0][1] res
      nock.isDone();
      done();
    },100);
  });
  it("should trigger global callback and not local callback when global not invoke next param", function(done) {
    var globalCallback = sinon.spy();
    var localCallback = sinon.spy();
    var request = new Request({
      callback: globalCallback
    });
    request.getRequest({ url: 'http://localhost:3000/item', endCallback: localCallback});
    setTimeout(function(){
      expect(globalCallback.called).to.be.equal(true);
      expect(globalCallback.args[0][0]).to.not.exist;//callback.args[0][0] err
      expect(globalCallback.args[0][1].body.param).to.be.equal('test');//callback.args[0][1] res
      expect(localCallback.called).to.be.equal(false);
      nock.isDone();
      done();
    },100);
  });
  it("should trigger global callback and local callback with equal err and response params", function(done) {
    var localCallback = sinon.spy();
    var request = new Request({
      callback: function(err, res, next) {
        next();
      }
    });
    request.getRequest({
      url: 'http://localhost:3000/item',
      endCallback: localCallback
    });
    setTimeout(function(){
      expect(localCallback.called).to.be.equal(true);
      expect(localCallback.args[0][0]).to.not.exist;//callback.args[0][0] err
      expect(localCallback.args[0][1].body.param).to.be.equal('test');//callback.args[0][1] res
      nock.isDone();
      done();
    },200);
  });
  it("should trigger global callback and local callback with err value", function(done) {
    var localCallback = sinon.spy();
    var request = new Request({
      callback: function(err, res, next) {
        next({ code:500}, null);
      }
    });
    request.getRequest({
      url: 'http://localhost:3000/item',
      endCallback: localCallback
    });
    setTimeout(function(){
      expect(localCallback.called).to.be.equal(true);
      expect(localCallback.args[0][0]).to.exist;//callback.args[0][0] err
      expect(localCallback.args[0][0].code).to.be.equal(500);
      expect(localCallback.args[0][1]).to.not.exist;//callback.args[0][1] res
      nock.isDone();
      done();
    },200);
  });
  it("should trigger global callback and local callback with different response", function(done) {
    var localCallback = sinon.spy();
    var request = new Request({
      callback: function(err, res, next) {
        next(null, {param: res.body.param + 'A'});
      }
    });
    request.getRequest({
      url: 'http://localhost:3000/item',
      endCallback: localCallback
    });
    setTimeout(function(){
      expect(localCallback.called).to.be.equal(true);
      expect(localCallback.args[0][0]).to.not.exist;//callback.args[0][0] err
      expect(localCallback.args[0][1].param).to.be.equal('testA');//callback.args[0][1] res
      nock.isDone();
      done();
    },200);
  });
});
