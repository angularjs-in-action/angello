angular.module('Angello.User')
    .controller('UserCtrl', ['$scope', '$routeParams', 'user', 'stories',
        function ($scope, $routeParams, user, stories) {
            $scope.userId = $routeParams['userId'];
            $scope.user = user;

            $scope.getAssignedStories = function (userId, stories) {
                var assignedStories = {};
                var keys = Object.keys(stories);
                for (var i = 0, len = keys.length; i < len; i++) {
                    var key = keys[i];
                    if (stories[key].assignee == userId) assignedStories[key] = stories[key];
                }
                return assignedStories;
            };

            $scope.stories = $scope.getAssignedStories($scope.userId, stories);
        }]);
