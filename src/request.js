import superagent from 'superagent';

class Request {

  constructor(options = {}) {
    this.baseUrl = options.baseUrl || '';
    this.timeout = options.timeout;
    this.type = options.type || 'json';
    this.headers = options.headers || {};
    this.endCallback = options.endCallback
  }

  addHeader(key, value) {
    this.headers[key] = value;
  }

  removeHeader(key) {
    delete this.headers[key];
  }

  _configRequest(request, options) {
    if(this.timeout) {
      request = request.timeout(this.timeout);
    }
    if(this.type) {
      request = request.type(this.type);
    }
    let headers = Object.assign({}, this.headers, options.headers);
    Object.keys(headers).forEach((key) => {
      let value = headers[key];
      if(value !== undefined && value !== null) {
        request = request.set(key, value);
      }
    });

    return request.end((err, res) => {
      if(this.endCallback && options.endCallback) {
        this.endCallback(err, res, (newErr = err, newRes = res) => options.endCallback(newErr, newRes));
      } else if(this.endCallback) {
        this.endCallback(err, res, () => {});
      }else if(options.endCallback) {
        options.endCallback(err, res);
      }
    });
  }

  _configUrl(url = '') {
    return this.baseUrl + url;
  }

  getRequest(options = {}) {
    this._configRequest(superagent.get(this._configUrl(options.url)).query(options.query), options);
  }

  postRequest(options = {}) {
    this._configRequest(superagent.post(this._configUrl(options.url)).send(options.body).query(options.query), options);
  }


  putRequest(options = {}) {
    this._configRequest(superagent.put(this._configUrl(options.url)).send(options.body).query(options.query), options);
  }

  deleteRequest(options = {}) {
    this._configRequest(superagent.del(this._configUrl(options.url)).query(options.query), options);
  }

  request() {
    return superagent;
  }
}

export default Request;
