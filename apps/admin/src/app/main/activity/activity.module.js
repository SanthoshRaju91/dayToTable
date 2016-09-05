(function ()
{
    'use strict';

    angular
        .module('app.activity', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.activity', {
                url    : '/activity',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/activity/activity.html',
                        controller : 'ActivityController as vm'
                    }
                },
                resolve: {
                    ActivityData: function (msApi)
                    {
                        return msApi.resolve('activity@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/activity');

        // Api
        msApiProvider.register('activity', ['app/data/activity/activity.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'ACTIVITY',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.activity', {
            title    : 'Add activity',
            icon     : 'icon-tile-four',
            state    : 'app.activity',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'ACTIVITY.ACTIVITY_NAV',
            weight   : 1
        });
    }
})();
