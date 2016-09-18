/*
* Controller for getting all the bookings for the registered user.
*/

module.exports = (function() {
  var app = angular.module('app.booking-profile-ctrl', []);

  // providing Auth configuration.
  app.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });

  app.controller('bookingCtrl', ['$scope', '$http', 'RestService', 'AuthService',  function($scope, $http, RestService, AuthService) {
    let userID = (AuthService.getUserDetails()) ?  AuthService.getUserDetails().userID : '';

    $scope.dateSortList = [{key: 'asc', name: 'Oldest'}, {key: 'desc', name: 'Recent'}];
    /*
    * HTTP POST to get all the user bookings sorted by created date.
    */
    $http({method: 'POST', url: RestService.getRESTUrl() + 'getUserBookings', data: {userID: userID}})
      .then(function(response) {
        if(response.data.status === 200 && response.data.success) {
          $scope.bookingList = response.data.bookingList;
        }
      }, function(errorResponse) {
        console.log('Error while getting user bookings' + errorResponse);
      });

      /**
      * Function to cancel booking
      * @method: cancelBooking
      */
      $scope.$on('CANCEL_BOOKING', function(event, bookingID) {
        $http({method: 'POST', url: RestService.getRESTUrl() + 'cancelBooking', data: { bookingID: bookingID}})
          .then(function(response) {
            if(response.data.status === 200 && response.data.success) {
              // function for getting refreshed data.
              $scope.bookingList = [];
              $http({method: 'POST', url: RestService.getRESTUrl() + 'getUserBookings', data: {userID: userID}})
                .then(function(response) {
                  if(response.data.status === 200 && response.data.success) {
                    $scope.bookingList = response.data.bookingList;
                  }
                }, function(errorResponse) {
                  console.log('Error while getting user bookings' + errorResponse);
                });
            }
          }, function(errorResponse) {
            console.log('Error while cancelling the booking ' + errorResponse);
          })
      });

      /**
      * Function to get the list by applied sort
      * @method: sortList
      */
      $scope.sortList = function(selected) {
        $http({method: 'POST', url: RestService.getRESTUrl() + 'sortBookingList/createDate/' + selected, data: {userID: userID}})
          .then(function(response) {
            if(response.data.status === 200 & response.data.success) {
              $scope.bookingList = [];
              $scope.bookingList = response.data.bookingList;
            }
          }, function(errorResponse) {
            console.log('Error while getting the sorted booking list: ' + errorResponse);
          });
      }
  }]);
}());
