var app = angular.module('myApp', ['ngMockE2E']);

// define our fake backend
app.run(function($httpBackend) {

  var phones = [{name: 'phone1'}, {name: 'phone2'}]; 
  var count = 0;
  
  $httpBackend.whenPOST('/phones').respond(function(method, url, data, headers){
    console.log('Received these data:', method, url, data, headers);
    phones.push(angular.fromJson({name: JSON.parse(data).name + ' ' + (count++)}));
    return [200, {}, {}];
  });
  
  $httpBackend.whenGET('/phones').respond(function(method,url,data) {
    console.log("Getting phones");
    return [200, phones, {}];
  });

  $httpBackend.whenDELETE(/\/phones\/\d*/).respond(function(method, url, data) {
    console.log("delete phone");
    return [200, phones, {}];
  });
});

app.controller('mainController', [
    '$scope',
    '$http',
    function($scope, $http) {
      
      $scope.update = function() {
        $http.get('/phones')
        .success(function(data) {
          $scope.phones = data;
        })
        .error(function(data) {
          console.log('error roi');
        });
      };
     
      $scope.addPhone = function(){
        $http.post('/phones', {'name':'New Phone'})
        .success(function() {
          $scope.update();
        })
        .error(function(data) {
          console.log('error roi');
        });
      };

      $scope.deletePhone = function(){
        var id = 000;
        $http.delete('/phones/' + id)
        .success(function(data) {
          console.log('asdasd');
        })
        .error(function(data) {
          console.log('error roi');
        });
      };
      
      $scope.update();
    }
  ])
// a controller
