(function ()
{
    'use strict';

    angular
        .module('app.activity')
        .controller('ActivityController', ActivityController);

    /** @ngInject */
    function ActivityController(ActivityData)
    {
        var vm = this;

        // Data
        vm.helloText = ActivityData.data.helloText;

        // Methods

        //////////
    }
})();
