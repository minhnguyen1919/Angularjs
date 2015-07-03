'use strict';

/**
 * @ngdoc function
 * @name tofoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tofoApp
 */
angular.module('tofoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
