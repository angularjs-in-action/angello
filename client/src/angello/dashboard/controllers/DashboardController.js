angular.module('Angello.Dashboard')
    .controller('DashboardCtrl',
        function ($scope, StoriesService, STORY_STATUSES, STORY_TYPES) {
            $scope.types = STORY_TYPES;
            $scope.statuses = STORY_STATUSES;
            $scope.stories = [];

            StoriesService.all().then(function (stories) {
                var arr = [];
                for (var key in stories.data) {
                    arr.push(stories.data[key]);
                }
                $scope.stories = arr;
            });
        });
