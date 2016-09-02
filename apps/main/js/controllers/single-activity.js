module.exports = (function() {
  var app = angular.module('app.single-activity', ['ui.router']);
  app.constant('REST_URL', 'http://localhost:3000/api/');
  app.controller('singleActivityCtrl', ['$scope', '$http', '$state', '$stateParams', 'REST_URL', function($scope, $http, $state, $stateParams, REST_URL) {
    var activityID = $stateParams.activityId;
    $http({method: 'GET', url: REST_URL + '/getActivityById/' + activityID})
      .then(function(response) {
        if(response.data.status === 200 && response.data.success) {
          $scope.activity = response.data.activity;
          $scope.ratings = [];
          for(let i=0; i<$scope.activity.ratings; i++) {
            $scope.ratings.push('icon-smile voted');
          }

          for(let i=0; i<(5-$scope.activity.ratings); i++) {
            $scope.ratings.push('icon-smile');
          }
          $scope.includedItems = $scope.activity.includes.split(',');
          $scope.schedules = $scope.activity.schedule.split('|');
          $scope.features = [];
          $scope.isParking = ($scope.activity.parking.length > 0) ? $scope.features.push({'iconClass': 'icon_set_1_icon-27', 'name': 'Parking'}) : false;
          $scope.isAudio = ($scope.activity.languages.length > 0) ? $scope.features.push({'iconClass': 'icon_set_1_icon-13', 'name': 'Accessibiliy'}): false;
          $scope.features.push({'iconClass': 'icon_set_1_icon-83', name: $scope.activity.duration});
        }
      }, function(error) {
        console.log('Error while getting the activity details' + error);
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
  }]);
}());
