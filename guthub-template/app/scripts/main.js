require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    angular: '../bower_components/angular/angular',
    angularRoute: '../bower_components/angular-route/angular-route',
    angularResource: '../bower_components/angular-resource/angular-resource',
    bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap'
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    angular: {
      deps: ['jquery', 'bootstrap'],
      exports: 'angular'
    },
    angularRoute: {
      deps: ['angular']
    },
    angularResource: {
      deps: ['angular']
    },
  }
});

require([
  'angular',
  'app',
  'controllers/list',
  'controllers/new',
  'controllers/view',
  'controllers/edit',
  'controllers/ingrediens',
  'directives/butterbar',
  'directives/focus',
  'services/recipe',
  'services/recipe-loader',
  'services/multi-recipe-loader'
],
  function(angular, app) {
    'use strict';

    app.config(['$routeProvider', function($routeProvider) {
      $routeProvider.
        when('/', {
          controller: 'ListCtrl',
          templateUrl:'/views/list.html',
          resolve: {
            recipes: ['MultiRecipeLoader', function(MultiRecipeLoader) {
              return new MultiRecipeLoader();
            }]
          }
        })
        .when('/edit/:recipeId', {
          controller: 'EditCtrl',
          resolve: {
            recipe: ['RecipeLoader', function(RecipeLoader) {
              return new RecipeLoader();
            }]
          },
          templateUrl:'/views/recipeForm.html'
        })
        .when('/view/:recipeId', {
          controller: 'ViewCtrl',
          resolve: {
            recipe: ['RecipeLoader', function(RecipeLoader) {
              return new RecipeLoader();
            }]
          },
          templateUrl:'/views/viewRecipe.html'
        })
        .when('/new', {
          controller: 'NewCtrl',
          templateUrl:'/views/recipeForm.html'
        })
        .otherwise({redirectTo:'/'});
      }
    ]);

    angular.element(document).ready(function () {
      angular.bootstrap(document, ['GuthubApp']);
    });
  }
);
