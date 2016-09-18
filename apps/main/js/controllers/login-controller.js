/*
* Login controller for login in the user
*/

module.exports = (function() {
  var app = angular.module('app.login-ctrl', []);
  app.controller('loginCtrl', ['$scope', '$http', '$location', 'RestService', 'AuthService', function($scope, $http, $location, RestService, AuthService) {
    $scope.isError = false;

    $scope.login = function(emailAddress, password) {
      $http({method: 'POST', url: RestService.getRESTUrl() + 'login', data: { emailAddress: emailAddress, password: password }})
        .then(function(response) {
          if(response.data.status === 200 && response.data.success) {
            AuthService.logIn(response.data.token, response.data.role, JSON.stringify(response.data.user));
            $location.path('/');
          } else {
            $scope.isError = true;
            $scope.errorMessage = response.data.message;
          }
        }, function(errorResponse) {
          console.log('Error while logging into the application: ' + errorResponse);
        });
    }

  }]);
}());
