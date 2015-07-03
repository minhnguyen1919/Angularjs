angular.module('sortApp', [])

.controller('mainController', function($scope) {
  $scope.sortType     = 'fish'; // set the default sort type
  $scope.sortReverse  = true;  // set the default sort order
  $scope.searchFish   = '';     // set the default search/filter term
  
  // create the list of sushi rolls 
  $scope.items = [
    {color: "red", id: 2},
    {color: "green", id: 3},
    {color: "blue", id: 1}
  ];
  
})
.filter('orderObjectBy', function() {
  return function(arr, field, reverse) {
    arr.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) arr.reverse();
    return arr;
  };
});
