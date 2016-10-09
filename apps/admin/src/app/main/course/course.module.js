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
        msApiProvider.register('getCategoryList', ['http://104.131.49.30:3000/api/getCategoryList']);
        msApiProvider.register('addCourse', ['http://104.131.49.30:3000/api/addCourse']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'COURSE',
            group : true,
            weight: 3
        });

        msNavigationServiceProvider.saveItem('fuse.course', {
            title    : 'Course',
            icon     : 'icon-tile-four',
            state    : 'app.course',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'COURSE.COURSE_NAV',
            weight   : 3
        });
    }
})();
