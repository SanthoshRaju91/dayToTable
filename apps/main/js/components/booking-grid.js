/*
* Component for booking grid with cancel and edit.
*/

module.exports = (function() {
  var app = angular.module('app.booking-grid-component', []);

  app.component('bookingGrid', {
    bindings: {
      data: '<'
    },
    templateUrl: '../../templates/components/booking-grid.html',
    controller: function() {

    }
  });
}());
