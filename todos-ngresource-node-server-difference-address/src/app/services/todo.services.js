/*global localStorage*/

;(function() {
  'use strict';

  function TodoStorage() {
    var todoStorage = [];

    /**
     * saving todos list
     */
    todoStorage.saveTodoList = function(todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    };

    /**
     * get todos list
     */
    todoStorage.getTodoList = function() {
      return JSON.parse(localStorage.getItem('todos'));
    };

    return todoStorage;
  }

  /**
   * factory for saving and get todos data from localStorage
   */
  angular.module('todosGulp')
    .factory('TodoStorage',
      [
        TodoStorage
      ]
    );
})();
