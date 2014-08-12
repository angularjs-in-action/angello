var myModule = angular.module('Angello',
    [
        'ngRoute',
        'ngAnimate',
        'firebase',
        'Angello.Common',
        'Angello.Dashboard',
        'Angello.Login',
        'Angello.Storyboard',
        'Angello.User'
    ]);

myModule.config(function ($routeProvider, $httpProvider) {
    var getCurrentUser = function (AuthService, $location) {
        return AuthService.getCurrentUser().then(function (user) {
            if (!user) $location.path('/login');
        });
    };

    $routeProvider.
        when('/', {
            templateUrl: 'src/angello/storyboard/tmpl/storyboard.html',
            controller: 'StoryboardCtrl',
            controllerAs: 'storyboard',
            resolve: {
                currentUser: getCurrentUser
            }
        }).
        when('/dashboard', {
            templateUrl: 'src/angello/dashboard/tmpl/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashboard',
            resolve: {
                currentUser: getCurrentUser
            }
        }).
        when('/users', {
            templateUrl: 'src/angello/user/tmpl/users.html',
            controller: 'UsersCtrl',
            controllerAs: 'users',
            resolve: {
                currentUser: getCurrentUser
            }
        }).
        when('/users/:userId', {
            templateUrl: 'src/angello/user/tmpl/user.html',
            controller: 'UserCtrl',
            controllerAs: 'User',
            resolve: {
                currentUser: getCurrentUser,
                user: function ($route, $routeParams, UsersService) {
                    var userId = $route.current.params['userId'] ? $route.current.params['userId'] : $routeParams['userId'];
                    return UsersService.fetch(userId);
                },
                stories: function (StoriesService) {
                    return StoriesService.all();
                }
            }
        }).
        when('/login', {
            templateUrl: 'src/angello/login/tmpl/login.html', 
            controller: 'LoginCtrl',
            controllerAs: 'login'
        }).
        otherwise({redirectTo: '/'});

    $httpProvider.interceptors.push('loadingInterceptor');
});

myModule.factory('loadingInterceptor', function(LoadingService) {
    var loadingInterceptor = {
        request: function(config) {
            LoadingService.setLoading(true);
            return config;
        },
        response: function(response) {
            LoadingService.setLoading(false);
            return response;
        }
    };
    return loadingInterceptor;
});

myModule.run(function ($rootScope, LoadingService) {
    $rootScope.$on('$routeChangeStart', function (e, curr, prev) {
        LoadingService.setLoading(true);
    });

    $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
        LoadingService.setLoading(false);
    });
});

myModule.value('STORY_STATUSES', [
    {name: 'To Do'},
    {name: 'In Progress'},
    {name: 'Code Review'},
    {name: 'QA Review'},
    {name: 'Verified'}
]);

myModule.value('STORY_TYPES', [
    {name: 'Feature'},
    {name: 'Enhancement'},
    {name: 'Bug'},
    {name: 'Spike'}
]);

myModule.constant('ENDPOINT_URI', 'https://angello.firebaseio.com/');
myModule.constant('Firebase', window.Firebase);


