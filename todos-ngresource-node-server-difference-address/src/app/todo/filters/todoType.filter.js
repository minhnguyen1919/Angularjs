;(function() {
  'use strict';

  /**
   * add filter for displaying todo by type
   */
  function todoType() {
    var filterTodo = function(listTodos, type) {
      var isCompleted;
      if (type === 'all') {
        return listTodos;
      } else if (type === 'active') {
        isCompleted = false;
      } else if (type === 'completed') {
        isCompleted = true;
      } else {
        return [];
      }

      return listTodos.filter(function(todo) {
        return todo.isCompleted === isCompleted;
      });
    };

    return filterTodo;
  }

  angular
    .module('todosGulp')
    .filter('todoType',
      [
        todoType
      ]
    );

})();
