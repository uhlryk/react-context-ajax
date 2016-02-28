import superagent from 'superagent';

class Request {

  constructor(options = {}) {
    this.baseUrl = options.baseUrl || '';
    this.timeout = options.timeout;
    this.type = options.type || 'json';
    this.headers = options.headers || [];
    this.callback = options.callback
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
      if(this.callback && endCallback) {
        this.callback(err, res, (newErr = err, newRes = res) => endCallback(newErr, newRes));
      } else if(this.callback) {
        this.callback(err, res, () => {});
      }else if(endCallback) {
        endCallback(err, res);
      }
    });
  }

  _configUrl(url) {
    return this.baseUrl + url;
  }

  getRequest(url, queryParams = {}, endCallback = null) {
    this._configRequest(superagent.get(this._configUrl(url)).query(queryParams), endCallback);
  }

  postRequest(url, bodyParams = {}, queryParams = {}, endCallback = null) {
    this._configRequest(superagent.post(this._configUrl(url)).send(bodyParams).query(queryParams), endCallback);
  }


  putRequest(url, bodyParams = {}, queryParams = {}, endCallback = null) {
    this._configRequest(superagent.put(this._configUrl(url)).send(bodyParams).query(queryParams), endCallback);
  }

  deleteRequest(url, bodyParams = {}, queryParams = {}, endCallback = null) {
    this._configRequest(superagent.del(this._configUrl(url)).send(bodyParams).query(queryParams), endCallback);
  }

  request() {
    return superagent;
  }
}

export default Request;
