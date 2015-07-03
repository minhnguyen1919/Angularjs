'use strict';

define(['controllers/controllers'], function(controllers) {
  controllers.controller('ListCtrl', ['$scope', 'recipes',
    function($scope, recipes) {
      $scope.recipes = recipes;
    }
  ]);
});
