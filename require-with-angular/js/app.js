/*global require*/
'use strict';

require([
  'angular'
], function (angular) {
  require([
    'todoCtrl'
  ], function (todoCtrl) {
    angular
      .module('todomvc', []);
      .controller('TodoController', todoCtrl);
    angular.bootstrap(document, ['todomvc']);
  }); 
});
