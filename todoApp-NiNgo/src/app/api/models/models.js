/* Models wrap all models */
'use strict';

var models = require('angular').module('models', []);

/* Todo factory */
models
  .factory('Model', [
      '_',
      require('./model')
  ]);

module.exports = models;
