(function () {

  'use strict';

  angular.module('app.dashboard')
    .controller('DashboardController', DashboardController);

    function DashboardController(DashboardData, $http, StepsService, msApi, $window, $mdToast) {

      var vm = this;
      var user = JSON.parse($window.localStorage.getItem('userDetails'));

      $http({method: 'GET', url: 'http://localhost:3000/api/coursesCountByUser/' + user._id})
        .then(function(response) {
          if(response.data.status === 200 && response.data.success) {
            vm.courseCount = response.data.count;
          }
        }, function(error) {
          console.log('Error while fetching course count');
        });

        $http({method: 'GET', url: 'http://localhost:3000/api/activitesCountByUser/' + user._id})
          .then(function(response) {
            if(response.data.status === 200 && response.data.success) {
              vm.activityCount = response.data.count;
            }
          }, function(error) {
            console.log('Error while fetching activity count');
          });
    }
})();
