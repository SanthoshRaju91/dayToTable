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
        })
        .state('contact', {
          url: '/contact',
          templateUrl: 'templates/contact.html',
          controller: 'contactCtrl',
          authenticate: false
        })
        .state('about', {
          url: '/about',
          templateUrl: 'templates/about.html',
          authenticate: false
        })
        .state('courses', {
          url: '/courses',
          templateUrl: 'templates/courses.html',
          controller: 'CoursesCtrl',
          authenticate: false
        })
        .state('course', {
          url: '/course/:courseId',
          templateUrl: 'templates/single-course.html',
          controller: 'singleCourseCtrl',
          authenticate: false
        })
        .state('confirmation', {
          url: '/confirmation/:id',
          templateUrl: 'templates/confirmation.html',
          controller: 'confirmationCtrl',
          authenticate: false
        })
        .state('profile', {
          abstract: true,
          url: '/profile',
          templateUrl: 'templates/profile.html',
          controller: 'profileCtrl',
          authenticate: true
        })
        .state('profile.bookings', {
          url: '/bookings',
          templateUrl: 'templates/profile/booking.html',
          controller: 'bookingCtrl',
          authenticate: true
        })
        .state('profile.settings', {
          url: '/settings',
          templateUrl: 'templates/profile/settings.html',
          controller: 'settingsCtrl',
          authenticate: true
        })
        .state('profile.profile', {
          url: '/user-profile',
          templateUrl: 'templates/profile/user-profile.html',
          controller: 'userProfileCtrl',
          authenticate: true
        })
        .state('coming',{
          url: '/coming',
          templateUrl: 'templates/coming-soon.html',
          controller: 'comingSoonCtrl',
          authenticate: true
        })
        .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl',
          authenticate: false
        });
    });

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
