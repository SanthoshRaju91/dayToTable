(function() {
  'use strict';

  angular.module('app.dashboard', [])
    .config(config);

  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    $stateProvider
        .state('app.dashboard', {
            url    : '/dashboard',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/dashboard/dashboard.html',
                    controller : 'DashboardController as vm'
                }
            },
            resolve: {
                DashboardData: function (msApi)
                {
                    //return msApi.resolve('course@get');
                    return [];
                }
            }
        });

        $translatePartialLoaderProvider.addPart('app/main/dashboard');

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'DASHBOARD',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.dashboard', {
            title    : 'Dashboard',
            icon     : 'icon-tile-four',
            state    : 'app.dashboard',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'DASHBOARD.DASHBOARD_NAV',
            weight   : 1
        });
  }
})();
