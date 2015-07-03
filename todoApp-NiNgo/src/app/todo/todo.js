/* todo wraps all components */
'use strict';

require('./directives/directives');
require('./services/services');
require('./controllers/controllers');

var todo = require('angular').module('todo', ['directives', 'services', 'controllers']);

module.exports = todo;
