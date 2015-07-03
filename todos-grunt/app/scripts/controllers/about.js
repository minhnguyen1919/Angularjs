'use strict';

/**
 * @ngdoc function
 * @name tofoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tofoApp
 */
angular.module('tofoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
