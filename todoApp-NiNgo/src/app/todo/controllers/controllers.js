/* Controllers wrap all controller */
'use strict';

var controllers = require('angular').module('controllers', []);

/* List todos controller */
controllers
  .controller('TodoCtrl', [
    '$scope',
    'Todo',
    require('./todo-controller')
  ]);

module.exports = controllers;
