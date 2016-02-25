var express = require('express');
var bodyParser = require('body-parser');

var app = express();

module.exports = function(callback) {

  app.use(bodyParser.json());

  app.get('/item', function(req, res) {
    callback(req.query, req.body, req.params);
    res.status(200).json({
      query: req.query, body: req.body, params: req.params
    });
  });
  app.get('/item/:param', function(req, res) {
    callback(req.query, req.body, req.params);
    res.status(200).json({
      query: req.query, body: req.body, params: req.params
    });
  });

  app.post('/item/', function(req, res) {
    callback(req.query, req.body, req.params);
    res.status(200).json({
      query: req.query, body: req.body, params: req.params
    });
  });

  app.put('/item/:param', function(req, res) {
    callback(req.query, req.body, req.params);
    res.status(200).json({
      query: req.query, body: req.body, params: req.params
    });
  });

  app.delete('/item/:param', function(req, res) {
    callback(req.query, req.body, req.params);
    res.status(200).json({
      query: req.query, body: req.body, params: req.params
    });
  });

  app.get('/error400', function(req, res) {
    callback(req.query, req.body, req.params);
    res.status(400).json({
      query: req.query, body: req.body, params: req.params
    });
  });
  app.get('/error404', function(req, res) {
    callback(req.query, req.body, req.params);
    res.status(404).json({
      query: req.query, body: req.body, params: req.params
    });
  });
  app.get('/error500', function(req, res) {
    callback(req.query, req.body, req.params);
    res.status(500).json({
      query: req.query, body: req.body, params: req.params
    });
  });
  return app;
};
