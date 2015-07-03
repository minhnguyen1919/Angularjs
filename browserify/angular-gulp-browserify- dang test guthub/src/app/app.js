'use strict'

var angular = require('../../bower_components/angular/angular');

// var RecipeService = require('services/recipe');
// var RecipeLoaderService = require('services/recipe-loader');
var MultiRecipeLoaderService = require('../../services/multi-recipe-loader');

angular
  .module('guthub', ['ngResource'])
  .factory('Recipe',
    [
      '$resource',
      RecipeService
    ]
  )
  .factory('MultiRecipeLoader',
    [
      'Recipe',
      '$q',
      function(Recipe, $q) {
        return function() {
          var delay = $q.defer();
          Recipe.query(function(recipes) {
            delay.resolve(recipes);
          },

          function() {
            delay.reject('Unable to fetch recipes');
          });

          return delay.promise;
        };
      }

    ]
  )
  .factory('RecipeLoader',
    [
      'Recipe',
      '$route',
      '$q',
      function(Recipe, $route, $q) {
        return function() {
          var delay = $q.defer();
          Recipe.get({id: $route.current.params.recipeId}, function(recipe) {
            delay.resolve(recipe);
          },

          function() {
            delay.reject('Unable to fetch recipe ' + $route.current.params.recipeId);
          });

          return delay.promise;
        };
      }

    ]
  )
  .controller('NewCtrl', ['$scope', '$location', 'Recipe',
  function($scope, $location, Recipe) {
    $scope.recipe = new Recipe({
      ingredients: [{}]
    });

    $scope.save = function() {
      $scope.recipe.$save(function(recipe) {
        $location.path('/view/' + recipe.id);
      });
    };
  }])
  .config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    controller: 'ListCtrl',
    resolve: {
      recipes: function(MultiRecipeLoader) {
        return new MultiRecipeLoader();
      }
    },
    templateUrl:'/app/views/list.html'
  }).when('/edit/:recipeId', {
    controller: 'EditCtrl',
    resolve: {
      recipe: function(RecipeLoader) {
        return new RecipeLoader();
      }
    },
    templateUrl:'/app/views/recipeForm.html'
  }).when('/view/:recipeId', {
    controller: 'ViewCtrl',
    resolve: {
      recipe: function(RecipeLoader) {
        return new RecipeLoader();
      }
    },
    templateUrl:'/app/views/viewRecipe.html'
  }).when('/new', {
    controller: 'NewCtrl',
    templateUrl:'/app/views/recipeForm.html'
  }).otherwise({redirectTo:'/'});
}])
  .directive('butterbar', ['$rootScope',
    function($rootScope) {
      return {
        link: function(scope, element, attrs) {
          element.addClass('hide');
          $rootScope.$on('$routeChangeStart', function() {
            element.removeClass('hide');
          });

          $rootScope.$on('$routeChangeSuccess', function() {
            element.addClass('hide');
          });
        }
      };
    }

  ])
  .directive('focus',
    function() {
      return {
        link: function(scope, element, attrs) {
          element[0].focus();
        }
      };
    }

  );
