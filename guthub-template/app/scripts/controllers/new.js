'use strict';

define(['controllers/controllers'], function(controllers) {
  controllers.controller('NewCtrl', ['$scope', '$location', 'Recipe',
    function($scope, $location, Recipe) {
      $scope.recipe = new Recipe({
        ingredients: [{}]
      });

      $scope.save = function() {
        $scope.recipe.$save(function(recipe) {
          $location.path('/view/' + recipe.id);
        });
      };
    }
  ]);
});

