/*
* Controller for user profile page.
*/

module.exports = (function() {
  var app = angular.module('app.user-profile-ctrl', []);

  app.controller('userProfileCtrl', ['$scope', '$http', 'RestService', 'AuthService', function($scope, $http, RestService, AuthService) {
    var userDetails = (AuthService.getUserDetails()) ? AuthService.getUserDetails() : '';

    if(userDetails) {
      $scope.emailAddress = userDetails.emailAddress;
      $scope.firstName = userDetails.firstName;
      $scope.lastName = userDetails.lastName;
      $scope.contact = userDetails.contact;
      $scope.gender = userDetails.gender;
    } else {

    }
  }]);
}());
