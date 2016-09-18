/*
* Rest service generic.
*/
module.exports = (function() {
  var app = angular.module('app.rest-service', []);

  app.service('RestService', function() {
    var rest = this;

    rest.getRESTUrl = function() {
      return 'http://45.55.232.197:3000/api/';
    }

    return rest;
  });
}());
