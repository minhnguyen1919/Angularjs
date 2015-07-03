/* api wraps all components */
'use strict';

require('./models/models');
require('./backend/app-mockbackend');

var api = require('angular').module('api', ['models', 'mockBackend']);

module.exports = api;
