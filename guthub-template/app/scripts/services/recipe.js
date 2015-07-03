'use strict';

define([
  'services/services'
], function(services) {
  services.factory('Recipe', ['$resource', function($resource) {
    return $resource('http://localhost:8000/recipes/:id', { id: '@id' });
  }]);
});
