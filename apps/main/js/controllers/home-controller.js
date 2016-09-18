module.exports = (function() {
  var app = angular.module('app.home-ctrl', []);

  app.controller('MainCtrl', ['$scope', '$http','AuthService', '$location', 'RestService', function($scope, $http, AuthService, $location, RestService) {
    $scope.isAdmin = (AuthService.getRole() == 'A') ? true : false;
    $scope.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;
    $scope.fullName = (AuthService.isAuthenticated()) ? AuthService.getUserDetails().firstName + " " + AuthService.getUserDetails().lastName : '';

    $scope.login = function(emailAddress, password) {
      $http({method: 'POST', url: RestService.getRESTUrl() + 'login', data: { emailAddress: emailAddress, password: password }})
        .then(function(response) {
          if(response.data.status === 200 && response.data.success) {
            AuthService.logIn(response.data.token, response.data.role, JSON.stringify(response.data.user));
            $scope.isAdmin = (AuthService.getRole() == 'A') ? true : false;
            $scope.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;
            $scope.fullName = (AuthService.isAuthenticated()) ? AuthService.getUserDetails().firstName + " " + AuthService.getUserDetails().lastName : '';
          }
        }, function(errorResponse) {
          console.log('Error while logging into the application: ' + errorResponse);
        });
    }

    $scope.logout = function() {
      AuthService.logOut();
      $location.path('/');
      $scope.isAdmin = (AuthService.getRole() == 'A') ? true : false;
      $scope.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;
      $scope.fullName = (AuthService.isAuthenticated()) ? AuthService.getUserDetails().firstName + " " + AuthService.getUserDetails().lastName : '';
    }

    $scope.register = function() {
      $location.path('register');
    }
  }]);
  app.controller('HomeCtrl', ['$scope', '$http', 'RestService', '$state', function($scope, $http, RestService, $state) {
    /**
    * HTTP get to get upcoming activites
    * @endpoint: getUpcomingActivites
    */
    $http({method: 'GET', url: RestService.getRESTUrl() + 'getUpcomingActivites'})
      .then(function(response) {
        if(response.data.status === 200 || response.data.success) {
          $scope.upcomingActivities = response.data.activityList;
        }
      }, function(errorResponse) {
        console.log("Error response" + errorResponse);
      });

      /**
      * HTTP get to retrieve popular courses
      * @endpoint: getPopularCourses
      */
      $http({method: 'GET', url: RestService.getRESTUrl() + 'getPopularCourses'})
        .then(function(response) {
          if(response.data.status === 200 || response.data.success) {
            $scope.popularCourses = response.data.courseList;
          }
        }, function(errorResponse) {
          console.log('Error response while getting popular courses' + errorResponse);
        });      
  }]);
}());
