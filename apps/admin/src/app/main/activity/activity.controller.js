(function () {
  'use strict';

  angular.module('app.activity')
    .controller('ActivityController', ActivityController);

    function ActivityController(ActivityData, $http, StepsService, msApi, $window, $mdToast, $location) {

      var vm = this;
      var user = JSON.parse($window.localStorage.getItem('userDetails'));

      vm.minDate = new Date();
      vm.isAddress = false;
      vm.isActivityName = false;
      vm.isActivityDesc = false;
      vm.isActivityCategory = false;
      vm.isSchedule = false;
      vm.isDuration = false;
      vm.isPrice = false;
      vm.isImageUrl = false;
      vm.isActivityLang = false;
      vm.isActivityAmenities = false;

      // Data
      vm.otherLanguages = [];
      vm.otherAmenities = [];

      msApi.request('getCategoryList@get', function(response) {
        if(response.status === 200 && response.success) {
          vm.categoryList = response.categoryList;
        }
      }, function(errorResponse) {
        console.log('Error while fetching categories');
      });

      vm.computeAddress = function() {
        vm.isAddress = true;
      }

      vm.computeActivityName = function() {
        vm.isActivityName = true;
      }

      vm.computeActivityDescription = function() {
        vm.isActivityDesc = true;
      }

      vm.computeActivityCategory = function() {
        vm.isActivityCategory = true;
      }

      vm.computeSchedule = function() {
        vm.isSchedule = true;
      }

      vm.computeDuration = function() {
        vm.isDuration = true;
      }

      vm.computeActivityPrice = function() {
        vm.isPrice = true;
      }

      vm.computeActivityImageUrl = function() {
        vm.isImageUrl = true;
      }

      vm.computeActivityLang = function() {
        vm.activityLanguages = [];

        if(vm.isEnglishChecked) {
          vm.activityLanguages.push('English');
        }

        if(vm.isChineseChecked) {
          vm.activityLanguages.push('Chinese');
        }

        if(vm.isSpanishChecked) {
          vm.activityLanguages.push('Spanish');
        }

        if(vm.isFrenchChecked) {
          vm.activityLanguages.push('French');
        }

        if(vm.isOtherChecked) {
          vm.activityLanguages = vm.otherLanguages;
        }
        vm.activityLanguages = vm.activityLanguages.join(' - ');
        vm.isActivityLang = true;
      }

      vm.computeActivityAmenities = function() {
        vm.activityAmenities = [];

        if(vm.isParkingChecked) {
          vm.activityAmenities.push('Parking');
        }

        if(vm.isWaterChecked) {
          vm.activityAmenities.push('Water')
        }

        if(vm.isOtherChecked) {
          vm.activityAmenities.push(vm.otherAmenities);
        }
        vm.activityAmenities = vm.activityAmenities.join();
        vm.isActivityAmenities = true;
      }


      vm.submitActivity = function() {
        var payload = {
          categoryID: vm.selectedActivityCategory.categoryID,
          userID: user.userID,
          activityName: vm.activityName,
          description: vm.activityDesc,
          schedule: vm.schedule,
          price: vm.activityPrice,
          amenities: vm.activityAmenities,
          address: vm.address,
          languages: vm.activityLanguages,
          imageUrl: vm.activityImageUrl,
          duration: vm.duration
        }

        $http({method: 'POST', url: 'http://localhost:3000/api/addActivity', data: payload})
          .then(function(response) {
            if(response.data.status === 200 && response.data.success) {
              $mdToast.show($mdToast.simple().textContent('Course added successfully, please check after a few minutes.'));
              $location.path('dashboard');
            } else {
              $mdToast.show($mdToast.simple().textContent('Something went wrong, while registering a new course. Please contact admin'));
            }
          }, function(errorResponse) {
            $mdToast.show($mdToast.simple().textContent('Something went wrong, while registering a new course. Please contact admin'));
            console.log('Error while registering new course: ' + errorResponse);
          })
      }
    }
})();
