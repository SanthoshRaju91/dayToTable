(function() {
  'use strict';

  angular.module('app.toolbar')
    .service('ToolBarService', ToolBarService);

    /** @ngInject*/
    function ToolBarService($window) {
      var user = this;

      user.getUserDetails = function() {
        return JSON.parse($window.localStorage.getItem('userDetails'));
      }

      user.getRole = function() {
        return $window.localStorage.getItem('role');
      }

      user.getUser = function() {
        return $window.localStorage.getItem('user');
      }

      user.isAuthenticated = function() {
        return $window.localStorage.getItem('isAuthenticated');
      }

      return user;
    }
}());
