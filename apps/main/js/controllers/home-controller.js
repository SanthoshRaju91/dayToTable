module.exports = (function() {
  var app = angular.module('app.home-ctrl', []);

  app.controller('MainCtrl', ['$scope', '$http','AuthService', '$location', 'RestService', function($scope, $http, AuthService, $location, RestService) {
    $scope.isAdmin = (AuthService.getRole() == 'A') ? true : false;
    $scope.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;

    $scope.login = function() {

    }

    $scope.register = function() {
      $location.path('register');
    }
  }]);
  app.controller('HomeCtrl', ['$scope', '$http', 'RestService', '$state', function($scope, $http, RestService, $state) {
    $http({method: 'GET', url: RestService.getRESTUrl() + 'getPopularActivites'})
      .then(function(response) {
        if(response.data.status === 200 || response.data.success) {
          $scope.popularActivityList = response.data.activityList;
        }
      }, function(errorResponse) {
        console.log("Error response" + errorResponse);
      });

      if(window.location.hash.length > 5 && $state.current.name === 'home' && $state.current.url === '/') {
       window.location.reload();
     }
  }]);
}());
