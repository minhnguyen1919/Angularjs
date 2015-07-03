/* Services wrap all services */
'use strict';

var services = require('angular').module('services', ['ngResource']);

/* Todo factory */
services
  .factory('Todo', [
      '$http',
      '$q',
      require('./todo-service')
  ]);

module.exports = services;
