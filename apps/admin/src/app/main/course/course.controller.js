(function ()
{
    'use strict';

    angular
        .module('app.course')
        .controller('CourseController', CourseController);

    /** @ngInject */
    function CourseController(CourseData, $http, StepsService)
    {
        var vm = this;

        vm.isAddress = false;
        vm.isCourseName = false;
        vm.isCourseDesc = false;
        vm.isCourseLang = false;
        vm.isCourseAmenities = false;
        vm.isCourseImageUrl = false;
        vm.isCoursePrice = false;
        vm.isCourseSchedule = false;
        vm.isCourseCategory = false;
        // Data
        vm.otherLanguages = [];
        vm.otherAmenities = [];
        vm.courseSchedule = [];

        $http({method: 'GET', url: 'http://localhost:3000/api/getCategoryList'})
          .then(function(response) {
            if(response.data.status === 200 && response.data.success) {
              vm.categoryList = response.data.categoryList;
            }
          }, function(errorResponse) {
            console.log('Error while fetching Categories');
          });
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
            vm.courseAmenities = vm.otherAmenities;
          }
          vm.isCourseAmenities = true;
        }

        vm.computeCourseImageUrl = function() {
          vm.isCourseImageUrl = true;
        }

        vm.computeCoursePrice = function() {
          vm.isCoursePrice = true;
        }

        vm.computeCourseSchedule = function() {
          vm.isCourseSchedule = true;
        }
        //////////
    }
})();
