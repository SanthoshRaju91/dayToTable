module.exports = (function() {
  var app = angular.module('app.auth-service', []);

  app.service('AuthService', ['$window', function($window) {
    var user = this;

    user.logIn = function(token, role, userDetails) {
      $window.localStorage.setItem('isAuthenticated', true);
      $window.localStorage.setItem('token', token);
      $window.localStorage.setItem('role', role);
      $window.localStorage.setItem('userDetails', userDetails);
    }

    user.logOut = function() {
      $window.localStorage.removeItem('isAuthenticated');
      $window.localStorage.removeItem('token');
      $window.localStorage.removeItem('role');
      $window.localStorage.removeItem('userDetails');
    }

    user.isAuthenticated = function() {
      return $window.localStorage.getItem('isAuthenticated');
    }

    user.getToken = function() {
      return $window.localStorage.getItem('token');
    }

    user.getRole = function() {
      return $window.localStorage.getItem('role');
    }

    user.getUserDetails = function() {
      return $window.localStorage.getItem('userDetails');
    }

    return user;
  }]);

  app.service('AuthInterceptor', ['AuthService', '$location', function(AuthService, $location) {
    var interceptorFactory = {};

    interceptorFactory.request = function(config) {
      var token = AuthService.getToken();

      if(token) {
        config.headers['authorization'] = 'Bearer ' + token;
      }
      return config;
    }

    interceptorFactory.responseError = function(response) {
      if(response.status = 401) {
        AuthService.logOut();
        $location.path('/login');
      }
    }

    return interceptorFactory;
  }]);
}());
