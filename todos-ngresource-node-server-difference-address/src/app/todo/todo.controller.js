;(function() {
  'use strict';

  /**
   * controller of todo module
   */
  function  TodoCtrl($scope, $http, TodoStorage) {
    $scope.todos = [];
    $scope.filterTodoType = 'all';
    $scope.message = '';

    var baseUrl = 'http://localhost:8080/todos';
    var saveTodoContent = '';

    $scope.update = function() {
      $http.get(baseUrl)
      .success(function(data) {
        console.log(data);
        $scope.todos = data;
      })
      .error(function(data) {
        console.log('error: ' + data);
      });
      // var aaa = $http.get(baseUrl);
      // return aaa;
    };

    $scope.update();


  }

  angular
    .module('todosGulp')
    .controller('TodoCtrl',
      [
        '$scope',
        '$http',
        'TodoStorage',
        TodoCtrl
      ]
    );

})();
