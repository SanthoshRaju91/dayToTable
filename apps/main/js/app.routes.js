module.exports = (function() {
  var app = angular.module('app.routes', ['ui.router']);

    app.config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl',
          authenticate: false,
          show: true
        })
        .state('register', {
          url: '/register',
          templateUrl: 'templates/register.html',
          controller: 'RegisterCtrl',
          authenticate: false,
          show: false
        })
        .state('activities', {
          url: '/activity-list',
          templateUrl: 'templates/activity-list.html',
          controller: 'ActivtiesCtrl',
          authenticate: false,
          show: false
        }).
        state('activity', {
          url: '/activity/:activityId',
          templateUrl: 'templates/single-activity.html',
          controller: 'singleActivityCtrl',
          authenticate: false,
          show: false
        })
        .state('contact', {
          url: '/contact',
          templateUrl: 'templates/contact.html',
          controller: 'contactCtrl',
          authenticate: false,
          show: false
        })
        .state('about', {
          url: '/about',
          templateUrl: 'templates/about.html',
          authenticate: false,
          show: false
        })
        .state('courses', {
          url: '/courses',
          templateUrl: 'templates/courses.html',
          controller: 'CoursesCtrl',
          authenticate: false,
          show: false
        })
        .state('course', {
          url: '/course/:courseId',
          templateUrl: 'templates/single-course.html',
          controller: 'singleCourseCtrl',
          authenticate: false,
          show: false
        })
        .state('confirmation', {
          url: '/confirmation/:id',
          templateUrl: 'templates/confirmation.html',
          controller: 'confirmationCtrl',
          authenticate: false,
          show: false
        })
        .state('profile', {
          url: '/profile',
          templateUrl: 'templates/profile.html',
          controller: 'profileCtrl',
          authenticate: false,
          show: false
        })
        .state('profile.bookings', {
          url: '/bookings',
          templateUrl: 'templates/profile/booking.html',
          controller: 'bookingCtrl',
          authenticate: false,
          show: false
        })
        .state('profile.settings', {
          url: '/settings',
          templateUrl: 'templates/profile/settings.html',
          controller: 'settingsCtrl',
          authenticate: false,
          show: false
        })
        .state('profile.profile', {
          url: '/user-profile',
          templateUrl: 'templates/profile/user-profile.html',
          controller: 'userProfileCtrl',
          authenticate: false,
          show: false
        });
    });

    app.config(function($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    })

    app.run(['$rootScope', '$state', '$window', 'AuthService', '$window', function($rootScope, $state, $window, AuthService, $window) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.main = toState.show;
        if(toState.authenticate && !AuthService.isAuthenticated()) {
          $state.transitionTo('home');
          event.preventDefault();
        }
      });
    }]);
}());
