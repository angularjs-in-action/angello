var myModule = angular.module('Angello', ['ngRoute']);

myModule.config(function($routeProvider, $httpProvider, $provide) {

    $routeProvider
        .when('/', {
            templateUrl: 'src/angello/storyboard/tmpl/storyboard.html'
        })
        .when('/dashboard', {
            templateUrl: 'src/angello/dashboard/tmpl/dashboard.html'
        })
        .when('/users', {
            templateUrl: 'src/angello/user/tmpl/users.html'
        })
        .when('/users/:userId', {
            templateUrl: 'src/angello/user/tmpl/user.html'
        })
        .when('/login', {
            templateUrl: 'src/angello/login/tmpl/login.html'
        })
        .otherwise({redirectTo: '/login'});

});