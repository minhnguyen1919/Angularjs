/* Todo controller */
'use strict';

module.exports = function($scope, Todo) {
  /* Definition */
  /**
   * filterValue is model with its values are
   * '': all todo
   * true: finished todo
   * false: active todo
   */
  $scope.filterValue = '';

  /* Define newTodo model */
  $scope.newTodo = {};
  $scope.newTodo.name = '';

  /* Define custom todoList array: is copy of todos */
  var todoArray = [];

  /* Define model finishedAll */
  $scope.finishedAll = false;

  /*=================================================*/

  /* Query to get list data from model Todo */
  Todo.query(function(data){
    /* Get data from service */
    todoArray = data;

    /* Add isEditMode field into todo list */
    _.forEach(todoArray, function(item) {
      item.isEditMode = false;
    });

    /* Assign processed data to model todos */
    $scope.todos = todoArray.reverse();

    /* Pagination */
    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;

    $scope.$watch('currentPage + numPerPage + todos', function() {
      var begin = (($scope.currentPage - 1) * $scope.numPerPage),
          end = begin + $scope.numPerPage;

      $scope.filteredTodos = $scope.todos.slice(begin, end);
    });
  });

  /**
   * add function
   * @param {event} event
   */
  $scope.add = function(event) {
    /** Start executing if this event is ENTER key pressed
     * and textbox is not empty
     */
    if (event.keyCode === 13 && this.newTodo.name !== '') {
      /* Call function add from service */
      Todo.add(this.newTodo, function(data) {

        /* Create new item from data */
        var newItem = data;
        newItem.isEditMode =  false;

        /* Add new todo into local array */
        todoArray.splice(0, 0, newItem);
      });

      /* Refresh textbox new todo's name */
      this.newTodo.name = '';
    }
  };

   /**
   * edit
   * @param  {object} todo todo is a chosen object, need to be updated
   * @param  {event} event shows keyCode from keyboard
   * @param  {string} attr be used to mark when updating
   */
  $scope.edit = function(todo, event, attr) {
    if(attr === 'finished' || (attr !== 'finished' && event.keyCode === 13)) {
      /* Update todo into server */
      Todo.edit({
        id: todo.id,
        name: todo.name,
        finished: todo.finished
      }, function(data) {
        /* Create updated item from data */
        var updatedItem = data;
        updatedItem.isEditMode =  false;

        /* Update todo into model */
        todoArray[todoArray.indexOf(todo)] = updatedItem;
      });

      if(attr !== 'finished' && event.keyCode === 13) {
        this.changeMode(todo);
      }
    }
  };

  /**
   * delete function
   * @param  {object} todo [description]
   */
  $scope.delete = function(todo, ele) {

    Todo.delete(todo.id, function(data) {
      if(data) {
        /*Remove class show from todo item */
        ele.target.parentElement.classList.remove('show');

        /*Remove todo from local array*/
        setTimeout(function() {
          $scope.$apply(function () {
            todoArray.splice(_.findIndex(todoArray, function(todo) {
              return todo.id === parseInt(todo.id);
            }), 1);
          });
        }, 800);
      }
    });
  };

  /**
   * filter: pass value to filter todo
   * @param  {string/boolean} type
   */

  $scope.filter = function(type) {
    this.filterValue = type;
  };

  /**
   * changeMode function
   * @param  {object} todo
   * Change todo's attribute isEditMode to show/hide textbox todo
   */
  $scope.changeMode = function(todo) {
    todo.isEditMode = !todo.isEditMode;
  };

  /**
   * countFinishedTodo
   * @return {string} message thats notifies number of items left
   */
  $scope.countFinishedTodo = function() {
    var itemLeft = 0;

    _.forEach(todoArray, function(todo) {
      if(!todo.finished) {
        itemLeft++;
      }
    });

    return itemLeft;
  };

  /**
   * clear function: clear all finished todo
   */
  $scope.clear = function() {
    /* Define promise to store result from service */
    var promise = Todo.clear();

    promise
    .then(function(data) {
      /* Execute delete todo from model when result success */
      if(data) {
        var deleteArr = [];
        _.forEach(todoArray, function(todo) {
          if(todo.finished) {
            deleteArr.push(todo);
          }
        });

        _.forEach(deleteArr, function(todo) {
          /*Remove class show from todo item */
          document.getElementById('todo-' + todo.id).classList.remove('show');

          /*Remove todo from local array*/
          setTimeout(function() {
            $scope.$apply(function () {
              todoArray.splice(todoArray.indexOf(todo), 1);
            });
          }, 800);
        });
      }
    }, function(error) {
      /* Notify if has any error */
      console.log('Clear failed: ', error);
    });
  };

  /**
   * checkAll
   * Finish all todo at a time
   */
  $scope.checkAll = function(event) {
    if(this.finishedAll) {
      _.forEach(todoArray, function(todo) {
        todo.finished = true;
        $scope.edit(todo, event, 'finished');
      });
    } else {
      _.forEach(todoArray, function(todo) {
        todo.finished = false;
        $scope.edit(todo, event, 'finished');
      });
    }
  };
};
