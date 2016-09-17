/**
* Controller function for single course
*/

module.exports = (function() {
  var app = angular.module('app.single-course-ctrl', []);

  app.controller('singleCourseCtrl', ['$scope', '$http', '$state', '$stateParams', 'RestService', '$location', function($scope, $http, $state, $stateParams, RestService, $location) {
    let courseId = $stateParams.courseId;

    $http({method: 'GET', url: RestService.getRESTUrl() + 'getCourseById/' + courseId})
      .then(function(response) {
        if(response.data.status === 200 && response.data.success) {
          $scope.course = response.data.course;
          console.log($scope.course);
          $scope.ratings = [];
          for(let i=0; i<$scope.course.ratings; i++) {
            $scope.ratings.push('icon-smile voted');
          }

          for(let i=0; i<(5-$scope.course.ratings); i++) {
            $scope.ratings.push('icon-smile');
          }
          $scope.includedItems = $scope.course.includes.split(',');
          $scope.schedules = $scope.course.schedule.split('|');
          $scope.features = [];
          $scope.isParking = ($scope.course.parking.length > 0) ? $scope.features.push({'iconClass': 'icon_set_1_icon-27', 'name': 'Parking'}) : false;
          $scope.isAudio = ($scope.course.languages.length > 0) ? $scope.features.push({'iconClass': 'icon_set_1_icon-13', 'name': 'Accessibiliy'}): false;
          $scope.features.push({'iconClass': 'icon_set_1_icon-83', name: $scope.course.duration});
        }
      }, function(errorResponse) {
        console.error('Error while fetching course details' + errorResponse);
      });

      $scope.adultCount = 0;
      $scope.childrenCount = 0;

      $scope.$watchGroup(['adultCount', 'childrenCount'], function(newValues, oldValues) {
        $scope.count = parseInt(newValues[0]) + parseInt(newValues[1]) || 0;
      });

      $scope.increment = function(type) {
        if(type === 'adult') {
          if($scope.adultCount < 10) {
            $scope.adultCount++;
          }
        } else {
          if($scope.childrenCount < 10) {
            $scope.childrenCount++;
          }
        }
      }

      $scope.decrement = function(type) {
        if(type === 'adult') {
          if($scope.adultCount > 0) {
            $scope.adultCount--;
          }
        } else {
          if($scope.childrenCount > 0) {
            $scope.childrenCount--;
          }
        }
      }
      $scope.minDate = new Date().toISOString().split('T')[0];


      /**
      * Function to submit the form for complete the booking
      */
      $scope.errorSubmit = false;
      $scope.submitBooking = function() {
        if($scope.adultCount == 0 && $scope.childrenCount == 0) {
          $scope.errorSubmit = true;
        } else {
          let payload = {
            emailAddress: $scope.emailAddress,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            telephone: $scope.telephone,
            courseId: $scope.course.courseID,
            adultCount: $scope.adultCount,
            childrenCount: $scope.childrenCount,
            date: $scope.selectedDate
          };

          $http({method: 'POST', url: RestService.getRESTUrl() + 'addCourseBookingFromUser', data: payload})
            .then(function(response) {
              if(response.data.status == 200 && response.data.success) {
                debugger;
                $location.path('confirmation/' + response.data.booking);
              }
            }, function(errorResponse) {
              console.log('Error while making a booking');
            });
        }
      }
  }]);
}());
