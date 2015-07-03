'use strict';
/* Load injects ngRoute, controllers, directives, services */
require('lodash');
require('ui-bootstrap');
require('angular-route');
require('angular-resource');
require('ngMockE2E');
require('./api/api');
require('./todo/todo');

var app = require('angular').module('todoApp', [
  'ui.bootstrap',
  'ngRoute',
  'mockBackend',
  'models',
  'api',
  'todo'
  ]);

/* Define constant for underscore lodash */
app.constant('_', window._);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'TodoCtrl',
      templateUrl:'app/todo/views/todo.html'
    });
  }]);
