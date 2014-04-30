var myModule = angular.module('Angello',
    ['ngRoute',
        'ngAnimate',
        'firebase',
        'Angello.Common',
        'Angello.Dashboard',
        'Angello.Login',
        'Angello.Storyboard',
        'Angello.User'
    ]);

myModule.config(function ($routeProvider) {
    var getCurrentUser = function (AuthService, $location) {
        return AuthService.getCurrentUser().then(function (user) {
            if (!user) $location.path('/login');
        });
    };

    $routeProvider.
        when('/', {
            templateUrl: 'src/angello/storyboard/tmpl/storyboard.html',
            controller: 'StoryboardCtrl',
            resolve: {
                currentUser: getCurrentUser
            }
        }).
        when('/dashboard', {
            templateUrl: 'src/angello/dashboard/tmpl/dashboard.html',
            controller: 'DashboardCtrl',
            resolve: {
                currentUser: getCurrentUser
            }
        }).
        when('/users', {
            templateUrl: 'src/angello/user/tmpl/users.html',
            controller: 'UsersCtrl',
            resolve: {
                currentUser: getCurrentUser
            }
        }).
        when('/users/:userId', {
            templateUrl: 'src/angello/user/tmpl/user.html',
            controller: 'UserCtrl',
            resolve: {
                currentUser: getCurrentUser,
                user: function ($routeParams, UsersService) {
                    var userId = $routeParams['userId'];
                    return UsersService.fetch(userId);
                },
                stories: function (StoriesService) {
                    return StoriesService.find();
                }
            }
        }).
        when('/login', {templateUrl: 'src/angello/login/tmpl/login.html', controller: 'LoginCtrl'}).
        otherwise({redirectTo: '/'});
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

myModule.directive('sortable', ['StoriesService', function (StoriesService) {
    var linker = function (scope, element, attrs) {
        var status = scope.status.name;

        element.sortable({
            items: 'li',
            connectWith: ".list",
            receive: function (event, ui) {
                var prevScope = angular.element(ui.item.prev()).scope();
                var curScope = angular.element(ui.item).scope();

                scope.$apply(function () {
                    // TODO Fix the entire drag and drop to order mechanism
                    // StoriesService.insertStoryAfter(curScope.story, prevScope.story);
                    // curScope.story.status = status; // Update the status
                });
            }
        });
    };

    return {
        restrict: 'A',
        link: linker
    };
}]);

myModule.animation('.list-area-expanded', [function () {
    return {
        addClass: function (element, className, done) {
            if (className == 'list-area-expanded') {
                TweenMax.to(element, 0.5, {right: 68, onComplete: done });
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            if (className == 'list-area-expanded') {
                TweenMax.to(element, 0.5, {right: 250, onComplete: done });
            }
            else {
                done();
            }
        }
    };
}]);

myModule.animation('.details-animation', [function () {
    return {
        addClass: function (element, className, done) {
            if (className == 'details-visible') {
                TweenMax.to(element, 0.5, {right: 0, onComplete: done });
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            if (className == 'details-visible') {
                TweenMax.to(element, 0.5, {right: -element.width() + 50, onComplete: done });
            }
            else {
                done();
            }
        }
    };
}]);
