'use strict';

define([
  'controllers/controllers'
], function(controllers) {
  controllers.controller('EditCtrl', ['$scope', '$location', 'recipe',
    function($scope, $location, recipe) {
      $scope.recipe = recipe;

      $scope.save = function() {
        $scope.recipe.$save(function(recipe) {
          $location.path('/view/' + recipe.id);
        });
      };

      $scope.remove = function() {
        delete $scope.recipe;
        $location.path('/');
      };
    }
  ]);
});
