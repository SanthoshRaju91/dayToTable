/**
* Controller function for courses.
* to get all courses for user, to get all courses for selected category,
* to get the sorted courses.
*/

module.exports = (function() {
  var app = angular.module('app.course-ctrl', []);

  app.controller('CoursesCtrl', ['$scope', '$http', 'RestService', function($scope, $http, RestService) {

    // price and ratings list configuration for sorting
    $scope.priceList = [{id: 'lowest,price', name: 'Lowest price'}, {id: 'highest,price', name: 'Highest price'}];
    $scope.ratingsList = [{id: 'lowest,ratings', name: 'Lowest ranking'}, {id: 'highest,ratings', name: 'Highest ranking'}];

    /**
    * HTTP GET request block for retreiving all the available categories for
    * courses list.
    * @endpoint: getCategoryList
    */
    $http.get(RestService.getRESTUrl() + 'getCategoryList')
      .then(function(response) {
        if(response.data.status === 200 && response.data.success) {
          $scope.categories = [];
          var iconsArray = { MUSIC: 'icon-music-3', DANCE: 'icon-pitch', SOCCER: 'icon-soccer', SPORTS: 'icon-skiing', EDUCATION: 'icon-library', CRICKET: 'icon-cricket'};
          for(var i=0; i<response.data.categoryList.length; i++) {
            var obj = {};
            obj.categoryID = response.data.categoryList[i].categoryID;
            obj.iconClass = iconsArray[response.data.categoryList[i].categoryName.toUpperCase()];
            obj.categoryName = response.data.categoryList[i].categoryName;
            $scope.categories.push(obj);
          }
        }
      }, function(error) {
        console.log(error);
      });

      /**
      * HTTP GET block for retreiving availble courses for users.
      * @endpoint: getAllCoursesForUser
      */
      $http({method: 'GET', url: RestService.getRESTUrl() + 'getAllCoursesForUser'})
        .then(function(response) {
          if(response.data.status === 200 && response.data.success) {
            $scope.count = response.data.count;
            $scope.showPagination = ($scope.count > 10) ? true : false;
            $scope.courses = response.data.courseList;
          }
        }, function(error) {
          console.log("Error in getting courses for user: " + error);
        });

      /**
      * Function get all the courses for the selected category.
      * @method: getSelectedCategoryList
      * @endpoint: getCoursesByCategory
      */
      $scope.getSelectedCategoryList = function(categoryID) {
        let url = (categoryID == 'all') ? RestService.getRESTUrl() + 'getAllCoursesForUser' : RestService.getRESTUrl() + 'getActivitiesByCategory/' + categoryID;
        $http({method: 'GET', url: url})
          .then(function(response) {
            if(response.data.status === 200 && response.data.success) {
              $scope.count = response.data.count;
              $scope.showPagination = ($scope.count > 10) ? true : false;
              $scope.courses = response.data.courseList;
            }
          }, function(error) {
            console.log("Error in getting selected category activities list: " + error);
          });
        };

      /**
      * Function to get the sorted list of courses.
      * @method: sortList
      * @endpoint: getSortedCoursesList
      */
      $scope.sortList = function(selected) {
        var selectConfig = selected.id.split(',');
        $http({method: 'GET', url: RestService.getRESTUrl() + 'getSortedCoursesList/' + selectConfig[1] + '/' + selectConfig[0]})
          .then(function(response) {
            if(response.data.status === 200 && response.data.success) {
              $scope.count = response.data.count;
              $scope.showPagination = ($scope.count > 10) ? true : false;
              $scope.courses = response.data.courseList;
            }
          }, function(errorResponse) {
            console.log("Error in fetching sorted records: " + errorResponse);
          });
      };
  }]);
}());
