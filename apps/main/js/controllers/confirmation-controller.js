/**
* Controller for confirmation.js
*/
module.exports = (function() {
  var app = angular.module('app.confirmation-ctrl', []);

  app.controller('confirmationCtrl', ['$scope', '$http', 'RestService', '$location', '$state', '$stateParams', function($scope, $http, RestService, $location, $state, $stateParams) {
    var id = $stateParams.id;


    /**
    * Rest call to get the booking details for booking id
    * @endpoint: getBookingById/:id
    */
    $http({method: 'GET', url: RestService.getRESTUrl() + 'getBookingById/' + id})
      .then(function(response) {
        if(response.data.status == 200 && response.data.success) {
          if(response.data.reference) {
            $scope.booking = response.data.booking.booking;
            $scope.reference = response.data.booking.reference;
            $scope.bookingReference = response.data.bookingReference;
          } else {
            $scope.booking = response.data.booking.booking;
          }
        }
      }, function(errorResponse) {
        console.log('Error while getting the booking data by id' + errorResponse);
      });
  }]);
}());
