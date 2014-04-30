angular.module('Angello.Dashboard')
    .controller('DashboardCtrl', ['$scope', 'StoriesService', 'STORY_STATUSES', 'STORY_TYPES',
        function ($scope, StoriesService, STORY_STATUSES, STORY_TYPES) {
            $scope.types = STORY_TYPES;
            $scope.statuses = STORY_STATUSES;
            $scope.stories = [];

            StoriesService.find().then(function (stories) {
                var arr = [];
                for (var key in stories) {
                    arr.push(stories[key]);
                }
                $scope.stories = arr;
            });
        }]);
