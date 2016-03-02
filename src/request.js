import superagent from 'superagent';

class Request {

  constructor(options = {}) {
    this.baseUrl = options.baseUrl || '';
    this.timeout = options.timeout;
    this.type = options.type || 'json';
    this.headers = options.headers || [];
    this.endCallback = options.endCallback
  }

  addHeader(key, value) {
    this.headers[key] = value;
  }

  removeHeader(key) {
    delete this.headers[key];
  }

  _configRequest(request, endCallback) {
    if(this.timeout) {
      request = request.timeout(this.timeout);
    }
    if(this.type) {
      request = request.type(this.type);
    }
    this.headers.forEach((value, key) => {
      request = request.set(key, value);
    });

    return request.end((err, res) => {
      if(this.endCallback && endCallback) {
        this.endCallback(err, res, (newErr = err, newRes = res) => endCallback(newErr, newRes));
      } else if(this.endCallback) {
        this.endCallback(err, res, () => {});
      }else if(endCallback) {
        endCallback(err, res);
      }
    });
  }

  _configUrl(url = '') {
    return this.baseUrl + url;
  }

  getRequest(options = {}) {
    this._configRequest(superagent.get(this._configUrl(options.url)).query(options.query), options.endCallback);
  }

  postRequest(options = {}) {
    this._configRequest(superagent.post(this._configUrl(options.url)).send(options.body).query(options.query), options.endCallback);
  }


  putRequest(options = {}) {
    this._configRequest(superagent.put(this._configUrl(options.url)).send(options.body).query(options.query), options.endCallback);
  }

  deleteRequest(options = {}) {
    this._configRequest(superagent.del(this._configUrl(options.url)).query(options.query), options.endCallback);
  }

  request() {
    return superagent;
  }
}

export default Request;
