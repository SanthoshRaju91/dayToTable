module.exports = (function() {
  var app = angular.module('app.home-ctrl', []);
  app.constant('REST_URL', 'http://localhost:3000/api/');

  app.controller('MainCtrl', ['$scope', '$http','AuthService', '$location', 'REST_URL', function($scope, $http, AuthService, $location, REST_URL) {
    $scope.isAdmin = (AuthService.getRole() == 'A') ? true : false;
    $scope.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;

    $scope.login = function() {

    }

    $scope.register = function() {
      $location.path('register');
    }
  }]);
  app.controller('HomeCtrl', ['$scope', '$http', 'REST_URL', function($scope, $http, REST_URL) {
    $http({method: 'GET', url: REST_URL + 'getPopularActivites'})
      .then(function(response) {
        if(response.data.status === 200 || response.data.success) {
          $scope.popularActivityList = response.data.activityList;
        }
      }, function(errorResponse) {
        console.log("Error response" + errorResponse);
      });
  }]);
}());
