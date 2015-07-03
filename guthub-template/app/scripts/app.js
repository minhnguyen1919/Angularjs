'use strict';

define([
  'angular',
  'angularRoute',
  'controllers/controllers',
  'directives/directives',
  'services/services'
], function(angular) {
  return angular.module('GuthubApp', ['ngRoute', 'controllers','directives', 'services']);
});
