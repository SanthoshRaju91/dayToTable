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

      //Indefinite fix for caurosel on the landing page.
      if(window.location.hash.length > 5 && $state.current.name === 'home' && $state.current.url === '/') {
         window.location.reload();
       }
  }]);
}());
