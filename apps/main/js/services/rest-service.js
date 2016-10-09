/*
* Rest service generic.
*/
module.exports = (function() {
  var app = angular.module('app.rest-service', []);

  app.service('RestService', function() {
    var rest = this;

    rest.getRESTUrl = function() {
      return 'http://104.131.49.30:3000/api/'; 
    }

    return rest;
  });
}());
