var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var node_modules = {};
fs.readdirSync('node_modules')
  .forEach(function(mod) {
    node_modules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0'],
          compact: true
        }
      }
    ]
  },
  entry: [
    './src/request.js'
  ],
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, './../dist/'),
    filename: 'request.js'
  },
  externals: node_modules
};
