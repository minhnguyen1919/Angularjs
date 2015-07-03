var app = angular.module('myApp', ['ngResource', 'ngMockE2E']);

app.run(function($httpBackend) {
  var todoList = [
    { id: 111, text: 'playing football'},
    { id: 112, text: 'go swimming'},
    { id: 113, text: 'go to cinema'}
  ]

  function findIndexById(arr, id) {
    var index;
    arr.forEach(function(item, i) {
      if (item.id === parseInt(id)) {
        index = i;
      }
    })

    return index;
  }

  $httpBackend.whenGET('/app/todos').respond(function(method, url, data, header) {
    return [200, todoList, {}];
  })

  $httpBackend.whenDELETE(/\/app\/todos\/\d*/).respond(function (method, url, data, header) {
    var urlPart = url.replace('app/todos', '').split('/');
    var index = findIndexById(todoList, urlPart[2]);
    if (isNaN(index)) {
      return [404, 'The id ' + urlPart[2] + ' is not found', {}];
    } else {
      var todo = todoList.splice(index, 1);
      return [200, todo[0], {}];
    }
  })

  $httpBackend.whenPOST(/\/app\/todos\/\d*/).respond(function(method, url, data, header) {
    var urlPart = url.replace('app/todos', '').split('/');
    var index = findIndexById(todoList, urlPart[2]);
    if (isNaN(index)) {
      return [404, 'The id ' + urlPart[2] + ' is not found', {}];
    } else {
      todoList[index].text = JSON.parse(data).text;
      return [200, {}, {}];
    }
  })

  $httpBackend.whenPOST('/app/todos').respond(function(method, url, data, header) {
    todoList.push(JSON.parse(data));
    return [200, {}, {}];
  })
})