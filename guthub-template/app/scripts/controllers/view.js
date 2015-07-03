'use strict';

define([
  'controllers/controllers'
], function(controllers) {
  controllers.controller('ViewCtrl', ['$scope', '$location', 'recipe',
    function($scope, $location, recipe) {
      $scope.recipe = recipe;

      $scope.edit = function() {
        $location.path('/edit/' + recipe.id);
      };
    }
  ]);
});
