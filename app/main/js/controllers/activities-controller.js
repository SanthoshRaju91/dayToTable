module.exports = (function() {
  var app = angular.module('app.activities-ctrl', []);
  app.constant('REST_URL', 'http://localhost:3000/api/');

  app.controller('ActivtiesCtrl', ['$scope', '$http', 'REST_URL', function($scope, $http, REST_URL) {

    $http.get(REST_URL + 'getCategoryList')
      .then(function(response) {
        if(response.data.status === 200 && response.data.success) {
          $scope.categories = [];
          var iconsArray = { MUSIC: 'icon-music-3', DANCE: 'icon-pitch', SOCCER: 'icon-soccer', SPORTS: 'icon-skiing', EDUCATION: 'icon-library'};
          for(var i=0; i<response.data.categoryList.length; i++) {
            var obj = {};
            obj.iconClass = iconsArray[response.data.categoryList[i].categoryName.toUpperCase()];
            obj.categoryName = response.data.categoryList[i].categoryName;
            $scope.categories.push(obj);
          }
        }
      }, function(error) {
        console.log(error);
      });

      $http({method: 'GET', url: REST_URL + 'getAllActivitiesForUser'})
        .then(function(response) {
          if(response.data.status === 200 && response.data.success) {
            $scope.count = response.data.count;
            $scope.showPagination = ($scope.count > 10) ? true : false;
            $scope.activities = response.data.activityList;
          }
        }, function(error) {
          console.log(error);
        });

      $scope.selectCategory = function(categoryID) {
        $http({method: 'POST', url: REST_URL + 'getActivitiesByCategory', data: {'categoryID': categoryID}})
          .then(function(response) {

          }, function(error) {

          });
      }
  }]);
}());
