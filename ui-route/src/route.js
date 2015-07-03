var routerApp = angular.module('myApp', ['ui.router', 'ngResource', 'ngMockE2E']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home'); // Mọi đường dẫn không hợp lệ đều được chuyển đến state home

  $stateProvider
      .state('home', {    // Định ngĩa 1 state home
          url: '/home',  // khai báo Url hiển thị
          templateUrl: 'src/home.html',  // đường dẫn view
          controller: function($scope) {  // Khai báo 1 controller cho state home
            $scope.Name= ['Phạm', 'Minh', 'Tài'];
          }
        })
      .state('about', {    // Định ngĩa 1 state home
          url: '/about',  // khai báo Url hiển thị
          templateUrl: 'src/about.html',  // đường dẫn view
          controller: function($scope) {  // Khai báo 1 controller cho state home
            $scope.Name= ['Phạm', 'Minh', 'Tài'];
          }
        })
    });
