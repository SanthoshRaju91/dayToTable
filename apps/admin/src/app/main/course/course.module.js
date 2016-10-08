(function ()
{
    'use strict';

    angular
        .module('app.course', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.course', {
                url    : '/course',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/course/course.html',
                        controller : 'CourseController as vm'
                    }
                },
                resolve: {
                    CourseData: function (msApi)
                    {
                        //return msApi.resolve('course@get');
                        return [];
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/course');

        // Api
        //msApiProvider.register('course', ['app/data/course/course.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'Course',
            group : true,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('fuse.course', {
            title    : 'Add Course',
            icon     : 'icon-tile-four',
            state    : 'app.course',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'COURSE.COURSE_NAV',
            weight   : 2
        });
    }
})();
