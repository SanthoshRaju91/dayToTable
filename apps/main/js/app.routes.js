module.exports = (function() {
  var app = angular.module('app.routes', ['ui.router']);

    app.config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl',
          authenticate: false
        })
        .state('register', {
          url: '/register',
          templateUrl: 'templates/register.html',
          controller: 'RegisterCtrl',
          authenticate: false
        })
        .state('activities', {
          url: '/activity-list',
          templateUrl: 'templates/activity-list.html',
          controller: 'ActivtiesCtrl',
          authenticate: false
        }).
        state('activity', {
          url: '/activity/:activityId',
          templateUrl: 'templates/single-activity.html',
          controller: 'singleActivityCtrl',
          authenticate: false
        });
    });

    app.config(function($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    })

    app.run(['$rootScope', '$state', '$window', 'AuthService', function($rootScope, $state, $window, AuthService) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if(toState.authenticate && !AuthService.isAuthenticated()) {
          $state.transitionTo('home');
          event.preventDefault();
        }
      });
    }]);
}());
