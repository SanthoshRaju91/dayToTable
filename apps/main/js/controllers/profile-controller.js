/**
* User Profile controller, where it gets the user details, gets the user bookings, and make password and email updates.
*/

module.exports = (function() {
  var app = angular.module('app.profile-controller', []);

  app.controller('profileCtrl', ['$scope', '$http', 'RestService', '$location', 'AuthService', function($scope, $http, RestService, $location, AuthService) {
    $scope.fullName = AuthService.getUserDetails().firstName + ' ' + AuthService.getUserDetails().lastName;
  }]);
}());
