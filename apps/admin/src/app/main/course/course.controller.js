(function ()
{
    'use strict';

    angular
        .module('app.course')
        .controller('CourseController', CourseController);

    /** @ngInject */
    function CourseController(CourseData, $http, StepsService, msApi, $window, $mdToast, $location)
    {
        var vm = this;
        var user = JSON.parse($window.localStorage.getItem('userDetails'));
        // Data
        vm.isAddress = false;
        vm.isCourseName = false;
        vm.isCourseDesc = false;
        vm.isCourseLang = false;
        vm.isCourseAmenities = false;
        vm.isCourseImageUrl = false;
        vm.isCoursePrice = false;
        vm.isCourseSchedule = false;
        vm.isCourseCategory = false;
        vm.isCourseStartFrom = false;
        // Data
        vm.otherLanguages = [];
        vm.otherAmenities = [];
        vm.courseSchedule = [];

        // $http({method: 'GET', url: 'http://104.131.49.30:3000/api/getCategoryList'})
        //   .then(function(response) {
        //     if(response.data.status === 200 && response.data.success) {
        //       vm.categoryList = response.data.categoryList;
        //     }
        //   }, function(errorResponse) {
        //     console.log('Error while fetching Categories');
        //   });

        msApi.request('getCategoryList@get', function(response) {
          if(response.status === 200 && response.success) {
            vm.categoryList = response.categoryList;
          }
        }, function(errorResponse) {
          console.log('Error while fetching categories');
        })

        vm.minDate = new Date();

        // Methods

        vm.computeAddress = function() {
          vm.isAddress = true;
        }

        vm.computeCourseName = function() {
          vm.isCourseName = true;
        }
        vm.computeCourseDescription = function() {
          vm.isCourseDesc = true;
        }

        vm.computeCourseCategory = function() {
          vm.isCourseCategory = true;
        }

        vm.computeCourseLang = function() {
          vm.courseLanguages = [];

          if(vm.isEnglishChecked) {
            vm.courseLanguages.push('English');
          }

          if(vm.isChineseChecked) {
            vm.courseLanguages.push('Chinese');
          }

          if(vm.isSpanishChecked) {
            vm.courseLanguages.push('Spanish');
          }

          if(vm.isFrenchChecked) {
            vm.courseLanguages.push('French');
          }

          if(vm.isOtherChecked) {
            vm.courseLanguages = vm.otherLanguages;
          }
          vm.courseLanguages = vm.courseLanguages.join(' - ');
          vm.isCourseLang = true;
        }

        vm.computeCourseAmenities = function() {
          vm.courseAmenities = [];

          if(vm.isParkingChecked) {
            vm.courseAmenities.push('Parking');
          }

          if(vm.isWaterChecked) {
            vm.courseAmenities.push('Water')
          }

          if(vm.isOtherChecked) {
            vm.courseAmenities.push(vm.otherAmenities);
          }
          vm.courseAmenities = vm.courseAmenities.join();
          vm.isCourseAmenities = true;
        }

        vm.computeCourseImageUrl = function() {
          vm.isCourseImageUrl = true;
        }

        vm.computeCoursePrice = function() {
          vm.isCoursePrice = true;
        }

        vm.computeCourseSchedule = function() {
          vm.courseSchedule = vm.courseSchedule.join('|');
          vm.isCourseSchedule = true;
        }

        vm.computeStartFrom = function() {
          vm.isCourseStartFrom = true;
        }

        vm.submitCourse = function() {
          var payload = {
            categoryID: vm.selectedCourseCategory.categoryID,
            userID: user.userID,
            courseName: vm.courseName,
            description: vm.courseDesc,
            schedule: vm.courseSchedule,
            price: vm.coursePrice,
            amenities: vm.courseAmenities,
            address: vm.address,
            languages: vm.courseLanguages,
            imageUrl: vm.courseImageUrl,
            startFrom: vm.courseStartDate,
            contactPerson: user.firstName + ' ' + user.lastName,
            contactNumber: user.contact,
            contactEmailAddress: user.emailAddress
          };

          $http({method: 'POST', url: 'http://104.131.49.30:3000/api/addCourse', data: payload})
            .then(function(response) {
              if(response.data.status === 200 && response.data.success) {
                $mdToast.show($mdToast.simple().textContent('Course added successfully, please check after a few minutes.'));
                $location.path('dashboard');
              } else {
                $mdToast.show($mdToast.simple().textContent('Something went wrong, while registering a new course. Please contact admin'));
              }
            }, function(error) {
              $mdToast.show($mdToast.simple().textContent('Something went wrong, while registering a new course. Please contact admin'));
              console.log('Error while registering new course: ' + error);
            })
        }

    }
})();
