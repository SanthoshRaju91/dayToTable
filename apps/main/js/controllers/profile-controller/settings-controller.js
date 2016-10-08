/*
* controller for user settings.
*/

module.exports = (function() {
  var app = angular.module('app.settings-ctrl', []);

  // configuring the jsonwebtoken authentication token for authenticate route.
  app.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });

  app.controller('settingsCtrl', ['$scope', '$http', 'RestService', 'AuthService', function($scope, $http, RestService, AuthService) {
    var user = AuthService.getUserDetails();

    /**
    * Function to reset user password.
    * @method: resetPassword
    * @endpoint: resetPassword
    */
    $scope.resetPassword = function() {
      if($scope.newPassword === $scope.confirmPassword) {
        let payload = {};
        payload.emailAddress = user.emailAddress;
        payload.oldPassword = $scope.oldPassword;
        payload.newPassword = $scope.newPassword;
        $http({method: 'POST', url: RestService.getRestURL() + 'resetPassword', data: payload})
          .then(function(response) {

          }, function(errorResponse) {

          });
      }
    };

  }]);
}());
