angular
  .module('myApp', [])
  .controller('MainCtrl', ['$q', function($q) {
    function asyncGreet(name) {
      var deferred = $q.defer();
      setTimeout(function() {
          deferred.notify('About to greet ' + name + '.');

          if (name) {
            deferred.resolve('Hello, ' + name + '!');
          } else {
            deferred.reject('Greeting ' + name + ' is not allowed.');
          }
        }, 3000);

        return deferred.promise;
    }

    var promise = asyncGreet('Robin Hood');
    promise.then(function(greeting) {
      alert('Success: ' + greeting);
    }, function(reason) {
      alert('Failed: ' + reason);
    }, function(update) {
      alert('Got notification: ' + update);
    });
  }])