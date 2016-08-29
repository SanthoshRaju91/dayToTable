module.exports = (function() {
  angular.module('app.home-ctrl', [])
    .controller('MainCtrl', ['$scope', 'AuthService', '$location', function($scope, AuthService, $location) {

      $scope.isAdmin = (AuthService.getRole() == 'A') ? true : false;
      $scope.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;

      $scope.login = function() {
        alert('Hi');
      }

      $scope.register = function() {
        $location.path('register');
      }

    }])
    .controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {

    }]);
}());
