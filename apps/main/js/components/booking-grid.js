/*
* Component for booking grid with cancel and edit.
*/

module.exports = (function() {
  var app = angular.module('app.booking-grid-component', []);

  app.component('bookingGrid', {
    bindings: {
      data: '<',
      cancelBooking: '&'
    },
    templateUrl: '../../templates/components/booking-grid.html',
    controller: function($http, $location, $scope) {

      let statuses = {A: 'Active', I: 'Cancelled'};
      this.bookingStatus = statuses[this.data.status];
      this.isCancelled = (this.data.status == 'I') ? true : false;

      this.cancelBooking = function(bookingID) {
        $scope.$emit('CANCEL_BOOKING', bookingID);
      }

      this.goTo = function() {
        $location.path('/' + this.data.reference + '/' + this.data.bookingReference);
      }
    }
  });
}());
