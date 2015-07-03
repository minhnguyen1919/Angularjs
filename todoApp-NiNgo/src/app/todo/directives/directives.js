/* Directives wrap all directive */
'use strict';

var directives = require('angular').module('directives', []);

/* focus directive */
directives
  .directive('ngcusFocus', require('./focus-directive'));

/* animate directive */
directives
  .directive('animate', require('./animate-directive'));

module.exports = directives;
