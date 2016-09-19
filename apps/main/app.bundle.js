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

	//directives
	__webpack_require__(1);

	//components scripts
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);

	//services scripts
	__webpack_require__(7);
	__webpack_require__(8);

	//controllers scripts
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);

	//route and main app scripts
	__webpack_require__(23);
	__webpack_require__(24);


/***/ },
/* 1 */
/***/ function(module, exports) {

	/*
	* directive for carousel slicker
	*/

	module.exports = (function() {
	  var app = angular.module('app.carousel-directive', []);

	  app.directive('carouselSlick', function() {
	    return {
	      restrict: 'E',
	      templateUrl: '../../templates/directives/carousel-slick.html',
	      link: function(scope, elem, attr) {
	        //elem('tp-banner-container').
	        jQuery('.tp-banner').revolution({
	            dottedOverlay: "none",
	            delay: 16000,
	            startwidth: 1170,
	            startheight: 550,
	            hideThumbs: 200,

	            thumbWidth: 100,
	            thumbHeight: 50,
	            thumbAmount: 5,

	            navigationType: "bullet",
	            navigationArrows: "solo",
	            navigationStyle: "none",

	            touchenabled: "on",
	            onHoverStop: "on",

	            swipe_velocity: 0.7,
	            swipe_min_touches: 1,
	            swipe_max_touches: 1,
	            drag_block_vertical: false,

	            parallax: "mouse",
	            parallaxBgFreeze: "on",
	            parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

	            keyboardNavigation: "off",

	            navigationHAlign: "center",
	            navigationVAlign: "bottom",
	            navigationHOffset: 0,
	            navigationVOffset: 20,

	            soloArrowLeftHalign: "left",
	            soloArrowLeftValign: "center",
	            soloArrowLeftHOffset: 20,
	            soloArrowLeftVOffset: 0,

	            soloArrowRightHalign: "right",
	            soloArrowRightValign: "center",
	            soloArrowRightHOffset: 20,
	            soloArrowRightVOffset: 0,

	            shadow: 0,
	            fullWidth: "on",
	            fullScreen: "off",

	            spinner: "spinner4",

	            stopLoop: "off",
	            stopAfterLoops: -1,
	            stopAtSlide: -1,

	            shuffle: "off",

	            autoHeight: "off",
	            forceFullWidth: "on",

	            hideThumbsOnMobile: "off",
	            hideNavDelayOnMobile: 1500,
	            hideBulletsOnMobile: "off",
	            hideArrowsOnMobile: "on",
	            hideThumbsUnderResolution: 0,

	            hideSliderAtLimit: 0,
	            hideCaptionAtLimit: 480,
	            hideAllCaptionAtLilmit: 480,
	            startWithSlide: 0,
	            videoJsPath: "rs-plugin/videojs/",
	            fullScreenOffsetContainer: ""
	        });
	      }
	    };
	  });
	}());


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = (function() {
	  var app = angular.module('app.activity-grid-component', []);

	  app.component('activityGrid', {
	    bindings: {
	      data: '<'
	    },
	    templateUrl: '../../templates/components/activity-grid.html',
	    controller: function($location) {
	      this.activity = this.data._doc;
	      this.imageURL = this.activity.imageUrl || '../../img/slides/slide-4.jpg';

	      var iconsArray = { MUSIC: 'icon-music-3', DANCE: 'icon-pitch', SOCCER: 'icon-soccer', SPORTS: 'icon-skiing', EDUCATION: 'icon-library', CRICKET: 'icon-cricket'};
	      this.overlayIcon = iconsArray[this.activity.categoryID.categoryName.toUpperCase()];
	      this.overlayName = this.activity.categoryID.categoryName;
	      this.scheduleList = this.activity.schedule.split('|');

	      //checking for activity currently open / closed.
	      this.isActive = (this.data.activityStatus.toUpperCase() == 'CLOSED') ? true: false;
	      this.ratings = [];
	      let self = this;
	      for(let i=0; i<this.activity.ratings; i++) {
	        self.ratings.push('icon-smile voted');
	      }

	      for(let i=0; i<(5-this.activity.ratings); i++) {
	        self.ratings.push('icon-smile');
	      }

	      this.goToActivity = function(activityId) {
	        $location.path('activity/' + activityId);
	      }
	    }
	  });
	}());


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = (function() {
	  var app = angular.module('app.popular-grid-component', []);

	  app.component('popularGrid', {
	    bindings: {
	      data: '<'
	    },
	    replace: true,
	    templateUrl: '../../templates/components/popular-grid.html',
	    controller: function($location) {
	      //Icon mapper for category.
	      let iconMapper = { MUSIC: 'icon-music-4', DANCE: 'icon_set_1_icon-30', EAT: 'icon_set_1_icon-14'};
	      this.categoryIconClass = iconMapper[this.data.category.toUpperCase()];

	      //computing ratings
	      this.ratings = [];
	      let self = this;
	      for(let i=0; i<this.data.ratings; i++) {
	        self.ratings.push('icon-smile voted');
	      }
	      for(let i=0; i<(5-this.data.ratings); i++) {
	        self.ratings.push('icon-smile');
	      }

	      /**
	      * Function for redirecting to course details page
	      * @method: goTo
	      */
	      this.goTo = function(courseId) {
	        $location.path('course/' + courseId);
	      }
	    }
	  });
	}());


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	* Course grid component.
	*/

	module.exports = (function() {
	  var app = angular.module('app.course-grid-component', []);

	  app.component('courseGrid', {
	    bindings: {
	      data: '<'
	    },
	    templateUrl: '../../templates/components/course-grid.html',
	    controller: function($location) {
	      this.imageURL = this.data.imageUrl || '../../img/slides/slide-4.jpg';

	      var iconsArray = { MUSIC: 'icon-music-3', DANCE: 'icon-pitch', SOCCER: 'icon-soccer', SPORTS: 'icon-skiing', EDUCATION: 'icon-library', CRICKET: 'icon-cricket'};

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

	      this.goToCourse = function(courseId) {
	        $location.path('course/' + courseId);
	      }
	    }
	  });
	}());


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	* Component for upcoming grid.
	*/

	module.exports = (function() {
	  var app = angular.module('app.upcoming-grid-component', []);

	  app.component('upcomingGrid', {
	    bindings: {
	      data: '<'
	    },
	    templateUrl: '../../templates/components/upcoming-grid.html',
	    controller: function($location) {
	      //Icon mapper for category.
	      let iconMapper = { MUSIC: 'icon-music-4', DANCE: 'icon_set_1_icon-30', EAT: 'icon_set_1_icon-14'};
	      this.categoryIconClass = iconMapper[this.data.category.toUpperCase()];

	      //formatting date for grid
	      let date = new Date(this.data.schedule);
	      this.scheduleDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + (date.getHours() + 1) + ':' + date.getMinutes();

	      /**
	      * Function for redirecting to activity details page.
	      * @method: goTo
	      */
	      this.goTo = function(activityId) {
	        $location.path('activity/' + activityId);
	      }
	    }
	  })
	}());


/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
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
	      return JSON.parse($window.localStorage.getItem('userDetails'));
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
/* 8 */
/***/ function(module, exports) {

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


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = (function() {
	  var app = angular.module('app.home-ctrl', []);

	  app.controller('MainCtrl', ['$scope', '$http','AuthService', '$location', 'RestService', function($scope, $http, AuthService, $location, RestService) {
	    $scope.isAdmin = (AuthService.getRole() == 'A') ? true : false;
	    $scope.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;
	    $scope.fullName = (AuthService.isAuthenticated()) ? AuthService.getUserDetails().firstName + " " + AuthService.getUserDetails().lastName : '';

	    $scope.login = function(emailAddress, password) {
	      $http({method: 'POST', url: RestService.getRESTUrl() + 'login', data: { emailAddress: emailAddress, password: password }})
	        .then(function(response) {
	          if(response.data.status === 200 && response.data.success) {
	            AuthService.logIn(response.data.token, response.data.role, JSON.stringify(response.data.user));
	            $scope.isAdmin = (AuthService.getRole() == 'A') ? true : false;
	            $scope.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;
	            $scope.fullName = (AuthService.isAuthenticated()) ? AuthService.getUserDetails().firstName + " " + AuthService.getUserDetails().lastName : '';
	          }
	        }, function(errorResponse) {
	          console.log('Error while logging into the application: ' + errorResponse);
	        });
	    }

	    $scope.logout = function() {
	      AuthService.logOut();
	      $location.path('/');
	      $scope.isAdmin = (AuthService.getRole() == 'A') ? true : false;
	      $scope.isAuthenticated = (AuthService.isAuthenticated()) ? true : false;
	      $scope.fullName = (AuthService.isAuthenticated()) ? AuthService.getUserDetails().firstName + " " + AuthService.getUserDetails().lastName : '';
	    }

	    $scope.register = function() {
	      $location.path('register');
	    }
	  }]);
	  app.controller('HomeCtrl', ['$scope', '$http', 'RestService', '$state', function($scope, $http, RestService, $state) {
	    /**
	    * HTTP get to get upcoming activites
	    * @endpoint: getUpcomingActivites
	    */
	    $http({method: 'GET', url: RestService.getRESTUrl() + 'getUpcomingActivites'})
	      .then(function(response) {
	        if(response.data.status === 200 || response.data.success) {
	          $scope.upcomingActivities = response.data.activityList;
	        }
	      }, function(errorResponse) {
	        console.log("Error response" + errorResponse);
	      });

	      /**
	      * HTTP get to retrieve popular courses
	      * @endpoint: getPopularCourses
	      */
	      $http({method: 'GET', url: RestService.getRESTUrl() + 'getPopularCourses'})
	        .then(function(response) {
	          if(response.data.status === 200 || response.data.success) {
	            $scope.popularCourses = response.data.courseList;
	          }
	        }, function(errorResponse) {
	          console.log('Error response while getting popular courses' + errorResponse);
	        });      
	  }]);
	}());


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = (function() {
	  var app = angular.module('app.register-ctrl', []);

	  app.controller('RegisterCtrl', ['$scope', '$http', '$location', 'RestService', function($scope, $http, $location, RestService) {

	    /**
	    * Check if the passwords matched, and register the user.
	    * @method: registerUser
	    */
	    $scope.registerUser = function() {
	      if($scope.password === $scope.confirmPassword) {
	        let payload = {
	          emailAddress: $scope.emailAddress,
	          password: $scope.password,
	          firstName: $scope.firstName,
	          lastName: $scope.lastName,
	          contact: $scope.contact,
	          gender: $scope.gender
	        };
	        $http({method: 'POST', url: RestService.getRESTUrl() + 'registerUser', data: payload })
	          .then(function(response) {
	            if(response.data.status === 200 && response.data.success) {
	              alert('User registered, please login again');
	              $location.path('/');
	            } else {
	              alert(response.data.message);
	            }
	          }, function(errorResponse) {
	            alert('Error while registering' + errorResponse);
	          });
	      } else {
	        alert('Passwods do not match');
	      }
	    };
	  }]);
	}());


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = (function() {
	  var app = angular.module('app.activities-ctrl', []);

	  app.controller('ActivtiesCtrl', ['$scope', '$http', 'RestService', function($scope, $http, RestService) {

	    $scope.priceList = [{id: 'lowest,price', name: 'Lowest price'}, {id: 'highest,price', name: 'Highest price'}];
	    $scope.ratingsList = [{id: 'lowest,ratings', name: 'Lowest ranking'}, {id: 'highest,ratings', name: 'Highest ranking'}];

	    $http.get(RestService.getRESTUrl() + 'getCategoryList')
	      .then(function(response) {
	        if(response.data.status === 200 && response.data.success) {
	          $scope.categories = [];
	          var iconsArray = { MUSIC: 'icon-music-3', DANCE: 'icon-pitch', SOCCER: 'icon-soccer', SPORTS: 'icon-skiing', EDUCATION: 'icon-library', CRICKET: 'icon-cricket'};
	          for(var i=0; i<response.data.categoryList.length; i++) {
	            var obj = {};
	            obj.categoryID = response.data.categoryList[i].categoryID;
	            obj.iconClass = iconsArray[response.data.categoryList[i].categoryName.toUpperCase()];
	            obj.categoryName = response.data.categoryList[i].categoryName;
	            $scope.categories.push(obj);
	          }
	        }
	      }, function(error) {
	        console.log(error);
	      });

	      $http({method: 'GET', url: RestService.getRESTUrl() + 'getAllActivitiesForUser'})
	        .then(function(response) {
	          if(response.data.status === 200 && response.data.success) {
	            $scope.count = response.data.count;
	            $scope.showPagination = ($scope.count > 10) ? true : false;
	            $scope.activities = response.data.activityList;
	          }
	        }, function(error) {
	          console.log("Error in gettign activities for user: " + error);
	        });

	      $scope.getSelectedCategoryList = function(categoryID) {
	        let url = (categoryID == 'all') ? RestService.getRESTUrl() + 'getAllActivitiesForUser' : RestService.getRESTUrl() + 'getActivitiesByCategory/' + categoryID;
	        $http({method: 'GET', url: url})
	          .then(function(response) {
	            if(response.data.status === 200 && response.data.success) {
	              $scope.count = response.data.count;
	              $scope.showPagination = ($scope.count > 10) ? true : false;
	              $scope.activities = response.data.activityList;
	            }
	          }, function(error) {
	            console.log("Error in getting selected category activities list: " + error);
	          });
	        };

	      $scope.sortList = function(selected) {
	        var selectConfig = selected.id.split(',');
	        $http({method: 'GET', url: RestService.getRESTUrl() + 'getSortedActivitiesList/' + selectConfig[1] + '/' + selectConfig[0]})
	          .then(function(response) {
	            if(response.data.status === 200 && response.data.success) {
	              $scope.count = response.data.count;
	              $scope.showPagination = ($scope.count > 10) ? true : false;
	              $scope.activities = response.data.activityList;
	            }
	          }, function(errorResponse) {
	            console.log("Error in fetching sorted records: " + errorResponse);
	          });
	      };
	  }]);
	}());


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = (function() {
	  var app = angular.module('app.single-activity', ['ui.router']);

	  app.controller('singleActivityCtrl', ['$scope', '$http', '$state', '$stateParams', 'RestService', '$location', function($scope, $http, $state, $stateParams, RestService, $location) {
	    var activityID = $stateParams.activityId;
	    $http({method: 'GET', url: RestService.getRESTUrl() + '/getActivityById/' + activityID})
	      .then(function(response) {
	        if(response.data.status === 200 && response.data.success) {
	          $scope.activity = response.data.activity;
	          $scope.ratings = [];
	          for(let i=0; i<$scope.activity.ratings; i++) {
	            $scope.ratings.push('icon-smile voted');
	          }

	          for(let i=0; i<(5-$scope.activity.ratings); i++) {
	            $scope.ratings.push('icon-smile');
	          }
	          $scope.includedItems = $scope.activity.includes.split(',');
	          $scope.features = [];
	          $scope.isParking = ($scope.activity.parking.length > 0) ? $scope.features.push({'iconClass': 'icon_set_1_icon-27', 'name': 'Parking'}) : false;
	          $scope.isAudio = ($scope.activity.languages.length > 0) ? $scope.features.push({'iconClass': 'icon_set_1_icon-13', 'name': 'Accessibiliy'}): false;
	          $scope.features.push({'iconClass': 'icon_set_1_icon-83', name: $scope.activity.duration});
	          $scope.isBookingAvailable = (response.data.activityStatus.toUpperCase() == 'OPEN') ? true : false;
	        }
	      }, function(error) {
	        console.log('Error while getting the activity details' + error);
	      });

	      $scope.adultCount = 0;
	      $scope.childrenCount = 0;

	      $scope.$watchGroup(['adultCount', 'childrenCount'], function(newValues, oldValues) {
	        $scope.count = parseInt(newValues[0]) + parseInt(newValues[1]) || 0;
	      });

	      $scope.increment = function(type) {
	        if(type === 'adult') {
	          if($scope.adultCount < 10) {
	            $scope.adultCount++;
	          }
	        } else {
	          if($scope.childrenCount < 10) {
	            $scope.childrenCount++;
	          }
	        }
	      }

	      $scope.decrement = function(type) {
	        if(type === 'adult') {
	          if($scope.adultCount > 0) {
	            $scope.adultCount--;
	          }
	        } else {
	          if($scope.childrenCount > 0) {
	            $scope.childrenCount--;
	          }
	        }
	      }

	      /**
	      * Function to book for activity.
	      * @method: bookActivity
	      * @method: addBookingForActivity
	      */
	      $scope.errorSubmit = false;
	      $scope.bookActivity = function() {
	        if($scope.adultCount == 0 && $scope.childrenCount == 0) {
	          $scope.errorSubmit = true;
	        } else {
	          let payload = {
	            emailAddress: $scope.emailAddress,
	            firstName: $scope.firstName,
	            lastName: $scope.lastName,
	            telephone: $scope.telephone,
	            activityID: $scope.activity.activityID,
	            adultCount: $scope.adultCount,
	            childrenCount: $scope.childrenCount
	          };

	          $http({method: 'POST', url: RestService.getRESTUrl() + 'addBookingActivityFromUser', data: payload})
	            .then(function(response) {
	              if(response.data.status === 200 || response.data.success) {
	                $location.path('confirmation/' + response.data.booking);
	              }
	            }, function(errorResponse) {
	              console.log('Error while submitting a booking : ' + errorResponse);
	            })
	        }
	      }
	  }]);
	}());


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = (function() {
	  var app = angular.module('app.contact-ctrl', []);

	  app.controller('contactCtrl', ['$scope', '$http', 'RestService',function($scope, $http, RestService) {
	    $scope.notification = false;

	    $scope.submitQuery = function() {
	      if($scope.verfication == (3 + 1)) {
	        $http({method: 'post', url: RestService.getRESTUrl() + 'queryMessage',data: {firstName: $scope.firstName, lastName: $scope.lastName, emailAddress: $scope.emailAddress, phone: $scope.phone, message: $scope.message}})
	        .then(function(response) {
	          if(response.data.success) {
	            $scope.alertType = 'alert-success';
	            $scope.notification = true;
	            $scope.notificationMessage = 'Your requested has been submitted, our team will get back to you ASAP';
	            $scope.firstName = $scope.lastName = $scope.emailAddress = $scope.phone = $scope.message = $scope.verfication = '';
	          }
	        }, function(error) {
	          $scope.alertType = 'alert-danger';
	          $scope.notification = true;
	          $scope.message = 'Something wen wrong, please contact the admin.';
	        });
	      }
	    }
	  }]);
	}());


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	* Controller function for courses.
	* to get all courses for user, to get all courses for selected category,
	* to get the sorted courses.
	*/

	module.exports = (function() {
	  var app = angular.module('app.course-ctrl', []);

	  app.controller('CoursesCtrl', ['$scope', '$http', 'RestService', function($scope, $http, RestService) {

	    // price and ratings list configuration for sorting
	    $scope.priceList = [{id: 'lowest,price', name: 'Lowest price'}, {id: 'highest,price', name: 'Highest price'}];
	    $scope.ratingsList = [{id: 'lowest,ratings', name: 'Lowest ranking'}, {id: 'highest,ratings', name: 'Highest ranking'}];

	    /**
	    * HTTP GET request block for retreiving all the available categories for
	    * courses list.
	    * @endpoint: getCategoryList
	    */
	    $http.get(RestService.getRESTUrl() + 'getCategoryList')
	      .then(function(response) {
	        if(response.data.status === 200 && response.data.success) {
	          $scope.categories = [];
	          var iconsArray = { MUSIC: 'icon-music-3', DANCE: 'icon-pitch', SOCCER: 'icon-soccer', SPORTS: 'icon-skiing', EDUCATION: 'icon-library', CRICKET: 'icon-cricket'};
	          for(var i=0; i<response.data.categoryList.length; i++) {
	            var obj = {};
	            obj.categoryID = response.data.categoryList[i].categoryID;
	            obj.iconClass = iconsArray[response.data.categoryList[i].categoryName.toUpperCase()];
	            obj.categoryName = response.data.categoryList[i].categoryName;
	            $scope.categories.push(obj);
	          }
	        }
	      }, function(error) {
	        console.log(error);
	      });

	      /**
	      * HTTP GET block for retreiving availble courses for users.
	      * @endpoint: getAllCoursesForUser
	      */
	      $http({method: 'GET', url: RestService.getRESTUrl() + 'getAllCoursesForUser'})
	        .then(function(response) {
	          if(response.data.status === 200 && response.data.success) {
	            $scope.count = response.data.count;
	            $scope.showPagination = ($scope.count > 10) ? true : false;
	            $scope.courses = response.data.courseList;
	          }
	        }, function(error) {
	          console.log("Error in getting courses for user: " + error);
	        });

	      /**
	      * Function get all the courses for the selected category.
	      * @method: getSelectedCategoryList
	      * @endpoint: getCoursesByCategory
	      */
	      $scope.getSelectedCategoryList = function(categoryID) {
	        let url = (categoryID == 'all') ? RestService.getRESTUrl() + 'getAllCoursesForUser' : RestService.getRESTUrl() + 'getActivitiesByCategory/' + categoryID;
	        $http({method: 'GET', url: url})
	          .then(function(response) {
	            if(response.data.status === 200 && response.data.success) {
	              $scope.count = response.data.count;
	              $scope.showPagination = ($scope.count > 10) ? true : false;
	              $scope.courses = response.data.courseList;
	            }
	          }, function(error) {
	            console.log("Error in getting selected category activities list: " + error);
	          });
	        };

	      /**
	      * Function to get the sorted list of courses.
	      * @method: sortList
	      * @endpoint: getSortedCoursesList
	      */
	      $scope.sortList = function(selected) {
	        var selectConfig = selected.id.split(',');
	        $http({method: 'GET', url: RestService.getRESTUrl() + 'getSortedCoursesList/' + selectConfig[1] + '/' + selectConfig[0]})
	          .then(function(response) {
	            if(response.data.status === 200 && response.data.success) {
	              $scope.count = response.data.count;
	              $scope.showPagination = ($scope.count > 10) ? true : false;
	              $scope.courses = response.data.courseList;
	            }
	          }, function(errorResponse) {
	            console.log("Error in fetching sorted records: " + errorResponse);
	          });
	      };
	  }]);
	}());


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	* Controller function for single course
	*/

	module.exports = (function() {
	  var app = angular.module('app.single-course-ctrl', []);

	  app.controller('singleCourseCtrl', ['$scope', '$http', '$state', '$stateParams', 'RestService', '$location', function($scope, $http, $state, $stateParams, RestService, $location) {
	    let courseId = $stateParams.courseId;

	    $http({method: 'GET', url: RestService.getRESTUrl() + 'getCourseById/' + courseId})
	      .then(function(response) {
	        if(response.data.status === 200 && response.data.success) {
	          $scope.course = response.data.course;
	          console.log($scope.course);
	          $scope.ratings = [];
	          for(let i=0; i<$scope.course.ratings; i++) {
	            $scope.ratings.push('icon-smile voted');
	          }

	          for(let i=0; i<(5-$scope.course.ratings); i++) {
	            $scope.ratings.push('icon-smile');
	          }
	          $scope.includedItems = $scope.course.includes.split(',');
	          $scope.schedules = $scope.course.schedule.split('|');
	          $scope.features = [];
	          $scope.isParking = ($scope.course.parking.length > 0) ? $scope.features.push({'iconClass': 'icon_set_1_icon-27', 'name': 'Parking'}) : false;
	          $scope.isAudio = ($scope.course.languages.length > 0) ? $scope.features.push({'iconClass': 'icon_set_1_icon-13', 'name': 'Accessibiliy'}): false;
	          $scope.features.push({'iconClass': 'icon_set_1_icon-83', name: $scope.course.duration});
	        }
	      }, function(errorResponse) {
	        console.error('Error while fetching course details' + errorResponse);
	      });

	      $scope.adultCount = 0;
	      $scope.childrenCount = 0;

	      $scope.$watchGroup(['adultCount', 'childrenCount'], function(newValues, oldValues) {
	        $scope.count = parseInt(newValues[0]) + parseInt(newValues[1]) || 0;
	      });

	      $scope.increment = function(type) {
	        if(type === 'adult') {
	          if($scope.adultCount < 10) {
	            $scope.adultCount++;
	          }
	        } else {
	          if($scope.childrenCount < 10) {
	            $scope.childrenCount++;
	          }
	        }
	      }

	      $scope.decrement = function(type) {
	        if(type === 'adult') {
	          if($scope.adultCount > 0) {
	            $scope.adultCount--;
	          }
	        } else {
	          if($scope.childrenCount > 0) {
	            $scope.childrenCount--;
	          }
	        }
	      }
	      $scope.minDate = new Date().toISOString().split('T')[0];


	      /**
	      * Function to submit the form for complete the booking
	      */
	      $scope.errorSubmit = false;
	      $scope.submitBooking = function() {
	        if($scope.adultCount == 0 && $scope.childrenCount == 0) {
	          $scope.errorSubmit = true;
	        } else {
	          let payload = {
	            emailAddress: $scope.emailAddress,
	            firstName: $scope.firstName,
	            lastName: $scope.lastName,
	            telephone: $scope.telephone,
	            courseId: $scope.course.courseID,
	            adultCount: $scope.adultCount,
	            childrenCount: $scope.childrenCount,
	            date: $scope.selectedDate
	          };

	          $http({method: 'POST', url: RestService.getRESTUrl() + 'addCourseBookingFromUser', data: payload})
	            .then(function(response) {
	              if(response.data.status == 200 && response.data.success) {
	                debugger;
	                $location.path('confirmation/' + response.data.booking);
	              }
	            }, function(errorResponse) {
	              console.log('Error while making a booking');
	            });
	        }
	      }
	  }]);
	}());


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	* Controller for confirmation.js
	*/
	module.exports = (function() {
	  var app = angular.module('app.confirmation-ctrl', []);

	  app.controller('confirmationCtrl', ['$scope', '$http', 'RestService', '$location', '$state', '$stateParams', function($scope, $http, RestService, $location, $state, $stateParams) {
	    var id = $stateParams.id;


	    /**
	    * Rest call to get the booking details for booking id
	    * @endpoint: getBookingById/:id
	    */
	    $http({method: 'GET', url: RestService.getRESTUrl() + 'getBookingById/' + id})
	      .then(function(response) {
	        if(response.data.status == 200 && response.data.success) {
	          if(response.data.reference) {
	            $scope.booking = response.data.booking.booking;
	            $scope.reference = response.data.booking.reference;
	            $scope.bookingReference = response.data.bookingReference;
	          } else {
	            $scope.booking = response.data.booking.booking;
	          }
	        }
	      }, function(errorResponse) {
	        console.log('Error while getting the booking data by id' + errorResponse);
	      });
	  }]);
	}());


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	* User Profile controller, where it gets the user details, gets the user bookings, and make password and email updates.
	*/

	module.exports = (function() {
	  var app = angular.module('app.profile-controller', []);

	  app.controller('profileCtrl', ['$scope', '$http', 'RestService', '$location', 'AuthService', function($scope, $http, RestService, $location, AuthService) {
	    $scope.fullName = AuthService.getUserDetails().firstName + ' ' + AuthService.getUserDetails().lastName;
	  }]);
	}());


/***/ },
/* 18 */
/***/ function(module, exports) {

	/*
	* Controller for getting all the bookings for the registered user.
	*/

	module.exports = (function() {
	  var app = angular.module('app.booking-profile-ctrl', []);

	  // providing Auth configuration.
	  app.config(function($httpProvider) {
	    $httpProvider.interceptors.push('AuthInterceptor');
	  });

	  app.controller('bookingCtrl', ['$scope', '$http', 'RestService', 'AuthService',  function($scope, $http, RestService, AuthService) {
	    let userID = (AuthService.getUserDetails()) ?  AuthService.getUserDetails().userID : '';

	    $scope.dateSortList = [{key: 'asc', name: 'Oldest'}, {key: 'desc', name: 'Recent'}];
	    /*
	    * HTTP POST to get all the user bookings sorted by created date.
	    */
	    $http({method: 'POST', url: RestService.getRESTUrl() + 'getUserBookings', data: {userID: userID}})
	      .then(function(response) {
	        if(response.data.status === 200 && response.data.success) {
	          $scope.bookingList = response.data.bookingList;
	        }
	      }, function(errorResponse) {
	        console.log('Error while getting user bookings' + errorResponse);
	      });

	      /**
	      * Function to cancel booking
	      * @method: cancelBooking
	      */
	      $scope.$on('CANCEL_BOOKING', function(event, bookingID) {
	        $http({method: 'POST', url: RestService.getRESTUrl() + 'cancelBooking', data: { bookingID: bookingID}})
	          .then(function(response) {
	            if(response.data.status === 200 && response.data.success) {
	              // function for getting refreshed data.
	              $scope.bookingList = [];
	              $http({method: 'POST', url: RestService.getRESTUrl() + 'getUserBookings', data: {userID: userID}})
	                .then(function(response) {
	                  if(response.data.status === 200 && response.data.success) {
	                    $scope.bookingList = response.data.bookingList;
	                  }
	                }, function(errorResponse) {
	                  console.log('Error while getting user bookings' + errorResponse);
	                });
	            }
	          }, function(errorResponse) {
	            console.log('Error while cancelling the booking ' + errorResponse);
	          })
	      });

	      /**
	      * Function to get the list by applied sort
	      * @method: sortList
	      */
	      $scope.sortList = function(selected) {
	        $http({method: 'POST', url: RestService.getRESTUrl() + 'sortBookingList/createDate/' + selected, data: {userID: userID}})
	          .then(function(response) {
	            if(response.data.status === 200 & response.data.success) {
	              $scope.bookingList = [];
	              $scope.bookingList = response.data.bookingList;
	            }
	          }, function(errorResponse) {
	            console.log('Error while getting the sorted booking list: ' + errorResponse);
	          });
	      }
	  }]);
	}());


/***/ },
/* 19 */
/***/ function(module, exports) {

	/*
	* controller for user settings.
	*/

	module.exports = (function() {
	  var app = angular.module('app.settings-ctrl', []);

	  app.controller('settingsCtrl', ['$scope', '$http', 'RestService', function($scope, $http, RestService) {

	  }]);
	}());


/***/ },
/* 20 */
/***/ function(module, exports) {

	/*
	* Controller for user profile page.
	*/

	module.exports = (function() {
	  var app = angular.module('app.user-profile-ctrl', []);

	  app.controller('userProfileCtrl', ['$scope', '$http', 'RestService', 'AuthService', function($scope, $http, RestService, AuthService) {
	    var userDetails = (AuthService.getUserDetails()) ? AuthService.getUserDetails() : '';

	    if(userDetails) {
	      $scope.emailAddress = userDetails.emailAddress;
	      $scope.firstName = userDetails.firstName;
	      $scope.lastName = userDetails.lastName;
	      $scope.contact = userDetails.contact;
	      $scope.gender = userDetails.gender;
	    } else {

	    }
	  }]);
	}());


/***/ },
/* 21 */
/***/ function(module, exports) {

	/*
	* Comming soon controller, will have only redirection function
	*/

	module.exports = (function() {
	  var app = angular.module('app.coming-ctrl', []);
	  app.controller('comingSoonCtrl', ['$location', function($location) {

	  }]);
	}());


/***/ },
/* 22 */
/***/ function(module, exports) {

	/*
	* Login controller for login in the user
	*/

	module.exports = (function() {
	  var app = angular.module('app.login-ctrl', []);
	  app.controller('loginCtrl', ['$scope', '$http', '$location', 'RestService', 'AuthService', function($scope, $http, $location, RestService, AuthService) {
	    $scope.isError = false;

	    $scope.login = function(emailAddress, password) {
	      $http({method: 'POST', url: RestService.getRESTUrl() + 'login', data: { emailAddress: emailAddress, password: password }})
	        .then(function(response) {
	          if(response.data.status === 200 && response.data.success) {
	            AuthService.logIn(response.data.token, response.data.role, JSON.stringify(response.data.user));
	            $location.path('/');
	          } else {
	            $scope.isError = true;
	            $scope.errorMessage = response.data.message;
	          }
	        }, function(errorResponse) {
	          console.log('Error while logging into the application: ' + errorResponse);
	        });
	    }

	  }]);
	}());


/***/ },
/* 23 */
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


/***/ },
/* 24 */
/***/ function(module, exports) {

	(function() {
	  angular.module('App', ['app.routes', 'app.auth-service', 'app.home-ctrl', 'app.register-ctrl', 'app.activities-ctrl'
	  , 'app.activity-grid-component', 'app.single-activity', 'app.popular-grid-component', 'app.contact-ctrl'
	  , 'app.rest-service', 'app.course-ctrl', 'app.course-grid-component', 'app.single-course-ctrl', 'app.confirmation-ctrl'
	  , 'app.upcoming-grid-component', 'app.profile-controller', 'app.booking-profile-ctrl', 'app.settings-ctrl'
	  , 'app.user-profile-ctrl', 'app.booking-grid-component', 'app.carousel-directive', 'app.coming-ctrl', 'app.login-ctrl']);
	}());


/***/ }
/******/ ]);