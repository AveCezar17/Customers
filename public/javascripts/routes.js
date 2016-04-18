/**
 * Created by oleksii on 18.04.16.
 */

customersApp.config(['$routeProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: '/partials/login.hbs'
            }).
            when('/search', {
                templateUrl: '/partials/search.hbs'
            }).
            otherwise({
                redirectTo: '/login'
            });
        /*$locationProvider.html5Mode(true);*/
    }])
    .run( function($rootScope, $location) {
        // register listener to watch route changes
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            if ( !(localStorage.getItem('customersToken') === null) ) {
                //if there is customersToken - redirect to /search
                $location.path("/search")
            } else {
                //if there is no customersToken - redirect to /login
                $location.path("/login")
            }
        });
    });