module.exports = (function() {
  var app = angular.module('app.register-ctrl', []);

  app.controller('RegisterCtrl', ['$scope', '$http', '$location', 'RestService', function($scope, $http, $location, RestService) {

    /**
    * Check if the passwords matched, and register the user.
    * @method: registerUser
    */
    $scope.registerUser = function() {
      if($scope.password === $scope.confirmPassword) {
        let payload = {
          emailAddress: $scope.emailAddress,
          password: $scope.password,
          firstName: $scope.firstName,
          lastName: $scope.lastName,
          contact: $scope.contact,
          gender: $scope.gender
        };
        $http({method: 'POST', url: RestService.getRESTUrl() + 'registerUser', data: payload })
          .then(function(response) {
            if(response.data.status === 200 && response.data.success) {
              alert('User registered, please login again');
              $location.path('/');
            } else {
              alert(response.data.message);
            }
          }, function(errorResponse) {
            alert('Error while registering' + errorResponse);
          });
      } else {
        alert('Passwods do not match');
      }
    };
  }]);
}());
