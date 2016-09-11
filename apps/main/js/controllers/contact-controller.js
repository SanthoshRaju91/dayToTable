module.exports = (function() {
  var app = angular.module('app.contact-ctrl', []);

  app.controller('contactCtrl', ['$scope', '$http', 'RestService',function($scope, $http, RestService) {
    $scope.notification = false;

    $scope.submitQuery = function() {
      if($scope.verfication == (3 + 1)) {
        $http({method: 'post', url: RestService.getRESTUrl() + 'queryMessage',data: {firstName: $scope.firstName, lastName: $scope.lastName, emailAddress: $scope.emailAddress, phone: $scope.phone, message: $scope.message}})
        .then(function(response) {
          if(response.data.success) {
            $scope.alertType = 'alert-success';
            $scope.notification = true;
            $scope.notificationMessage = 'Your requested has been submitted, our team will get back to you ASAP';
            $scope.firstName = $scope.lastName = $scope.emailAddress = $scope.phone = $scope.message = $scope.verfication = '';
          }
        }, function(error) {
          $scope.alertType = 'alert-danger';
          $scope.notification = true;
          $scope.message = 'Something wen wrong, please contact the admin.';
        });
      }
    }
  }]);
}());
