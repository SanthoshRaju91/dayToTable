/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//components scripts
	__webpack_require__(1);

	//services scripts
	__webpack_require__(2);

	//controllers scripts
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);

	//route and main app scripts
	__webpack_require__(6);
	__webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = (function() {
	  var app = angular.module('app.activity-grid-component', []);

	  app.component('activityGrid', {
	    bindings: {
	      data: '<'
	    },
	    templateUrl: '../../templates/components/activity-grid.html',
	    controller: function() {
	      this.imageURL = this.data.imageUrl || '../../img/slides/slide-4.jpg';

	      var iconsArray = { MUSIC: 'icon-music-3', DANCE: 'icon-pitch', SOCCER: 'icon-soccer', SPORTS: 'icon-skiing', EDUCATION: 'icon-library'};

	      this.overlayIcon = iconsArray[this.data.categoryID.categoryName.toUpperCase()];
	      this.overlayName = this.data.categoryID.categoryName;
	      this.scheduleList = this.data.schedule.split('|');

	      this.ratings = [];
	      let self = this;
	      for(let i=0; i<this.data.ratings; i++) {
	        self.ratings.push('icon-smile voted');
	      }

	      for(let i=0; i<(5-this.data.ratings); i++) {
	        self.ratings.push('icon-smile');
	      }
	    }
	  });
	}());


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = (function() {
	  angular.module('app.home-ctrl', [])
	    .controller('MainCtrl', ['$scope', 'AuthService', '$location', function($scope, AuthService, $location) {

	      $scope.isAdmin = (AuthService.getRole() == 'A') ? true : false;
	      $scope.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;

	      $scope.login = function() {
	        alert('Hi');
	      }

	      $scope.register = function() {
	        $location.path('register');
	      }

	    }])
	    .controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {

	    }]);
	}());


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = (function() {
	  var app = angular.module('app.register-ctrl', []);

	  app.controller('RegisterCtrl', ['$scope', function($scope) {

	  }]);
	}());


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = (function() {
	  var app = angular.module('app.activities-ctrl', []);
	  app.constant('REST_URL', 'http://localhost:3000/api/');

	  app.controller('ActivtiesCtrl', ['$scope', '$http', 'REST_URL', function($scope, $http, REST_URL) {

	    $http.get(REST_URL + 'getCategoryList')
	      .then(function(response) {
	        if(response.data.status === 200 && response.data.success) {
	          $scope.categories = [];
	          var iconsArray = { MUSIC: 'icon-music-3', DANCE: 'icon-pitch', SOCCER: 'icon-soccer', SPORTS: 'icon-skiing', EDUCATION: 'icon-library'};
	          for(var i=0; i<response.data.categoryList.length; i++) {
	            var obj = {};
	            obj.iconClass = iconsArray[response.data.categoryList[i].categoryName.toUpperCase()];
	            obj.categoryName = response.data.categoryList[i].categoryName;
	            $scope.categories.push(obj);
	          }
	        }
	      }, function(error) {
	        console.log(error);
	      });

	      $http({method: 'GET', url: REST_URL + 'getAllActivitiesForUser'})
	        .then(function(response) {
	          if(response.data.status === 200 && response.data.success) {
	            $scope.count = response.data.count;
	            $scope.showPagination = ($scope.count > 10) ? true : false;
	            $scope.activities = response.data.activityList;
	          }
	        }, function(error) {
	          console.log(error);
	        });

	      $scope.selectCategory = function(categoryID) {
	        $http({method: 'POST', url: REST_URL + 'getActivitiesByCategory', data: {'categoryID': categoryID}})
	          .then(function(response) {

	          }, function(error) {

	          });
	      }
	  }]);
	}());


/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
/***/ function(module, exports) {

	(function() {
	  angular.module('App', ['app.routes', 'app.auth-service', 'app.home-ctrl', 'app.register-ctrl', 'app.activities-ctrl'
	  , 'app.activity-grid-component']);  
	}());


/***/ }
/******/ ]);