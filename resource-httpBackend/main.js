function MainCtrl($scope, $http, $resource) {
  var res = $resource('/app/todos/:id', {id: '@_id'});

  $scope.listTodo = function() {
    res.query(function(data) {
      $scope.todos = data;
    }),
    function(data) {
      console.log(data);
    }
  }

  $scope.deleteTodo = function(id) {
    var params = {'id': id}
    res.remove(params,
      function(data) {
        $scope.listTodo();
      },
      function(data) {
        console.log(data.data);
      });
  }

  $scope.updateTodo = function(todo) {
    var params = {'id': todo.id};
    res.save(params, todo,
      function(data) {
        $scope.listTodo();
      },
      function(data) {
        console.log(data.data);
      });
  }

  $scope.addTodo = function(todo) {
    res.save(todo,
      function(data) {
        $scope.listTodo();
      },
      function(data) {
        console.log(data.data);
      });
  }

  $scope.listTodo();
}