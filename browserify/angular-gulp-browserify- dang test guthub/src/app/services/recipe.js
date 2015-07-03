'use strict';

module.exports = function() {
  angular
    .module('guthub.services', ['ngResource'])
    .factory('Recipe',
      [
        '$resource',
        function($resource) {
          return $resource('/recipes/:id', {id: '@id'});
        }

      ]
    );
}
