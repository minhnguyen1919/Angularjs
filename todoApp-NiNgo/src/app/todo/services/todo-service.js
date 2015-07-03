/* Todo service */
'use strict';
module.exports = function($http, $q) {
  /* Define base Url */
  var baseUrl = '/api/todos';

  return {
    /* Get todo by id */
    get: function(id) {
      return $http.get(baseUrl + '/' + id);
    },

    /* Add new todo */
    add: function(todo, callback) {
      var url = todo.id ? baseUrl + '/' + todo.id : baseUrl;
      return $http.post(url, JSON.stringify(todo))
      .success(function(data) {
        callback(data);
      })
      .error(function() {});
    },

    /* Query list todo */
    query: function(callback) {
      $http.get(baseUrl)
      .success(function(data) {
        callback(data);
      })
      .error(function() {});
    },

    /* Edit one todo */
    edit: function(todo, callback) {
      return $http.post(baseUrl + '/' + todo.id, todo)
      .success(function(data) {
        callback(data);
      })
      .error(function() {});
    },

    /* Delete one todo */
    delete: function(id, callback) {
      return $http.delete(baseUrl + '/' + id)
      .success(function(data) {
        callback(data);
      })
      .error(function() {});
    },

    /* Delete finished todo */
    clear: function() {
      var delay = $q.defer();

      $http.delete(baseUrl)
      .success(function(data) {
        delay.resolve(data);
      })
      .error(function() {});

      return delay.promise;
    }
  };
};
