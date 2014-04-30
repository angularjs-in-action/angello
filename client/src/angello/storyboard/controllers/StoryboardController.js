angular.module('Angello.Storyboard')
    .controller('StoryboardCtrl', ['$scope', 'StoriesService', 'UsersService', 'STORY_STATUSES', 'STORY_TYPES',
        function ($scope, StoriesService, UsersService, STORY_STATUSES, STORY_TYPES) {
            $scope.detailsVisible = true;
            $scope.currentStoryId = null;
            $scope.currentStory = null;
            $scope.editedStory = {};
            $scope.stories = [];

            $scope.types = STORY_TYPES;
            $scope.statuses = STORY_STATUSES;

            $scope.users = {};

            UsersService.find()
                .then(function (result) {
                    $scope.users = (result !== 'null') ? result : {};
                }, function (reason) {
                    console.log('ERROR', reason);
                });


            $scope.setCurrentStory = function (id, story) {
                $scope.currentStoryId = id;
                $scope.currentStory = story;
                $scope.editedStory = angular.copy($scope.currentStory);
            };

            $scope.getStories = function () {
                StoriesService.find().then(function (result) {
                    $scope.stories = (result !== 'null') ? result : {};
                }, function (reason) {
                    console.log('ERROR', reason);
                });
            };

            $scope.createStory = function () {
                StoriesService.create($scope.editedStory).then(function (result) {
                    $scope.getStories();
                    $scope.resetForm();
                }, function (reason) {
                    console.log('ERROR', reason);
                });
            };

            $scope.updateStory = function () {
                var fields = ['title', 'description', 'criteria', 'status', 'type', 'reporter', 'assignee'];

                fields.forEach(function (field) {
                    $scope.currentStory[field] = $scope.editedStory[field]
                });

                StoriesService.update($scope.currentStoryId, $scope.editedStory).then(function (result) {
                    $scope.getStories();
                    $scope.resetForm();
                }, function (reason) {
                    console.log('ERROR', reason);
                });
            };

            $scope.updateCancel = function () {
                $scope.resetForm();
            };

            $scope.resetForm = function () {
                $scope.currentStory = null;
                $scope.editedStory = {};

                $scope.detailsForm.$setPristine();
            };

            $scope.setDetailsVisible = function (visible) {
                $scope.detailsVisible = visible;
            };

            $scope.storiesWithStatus = function (status) {
                var stories = {};
                var keys = Object.keys($scope.stories);
                for (var i = 0, len = keys.length; i < len; i++) {
                    var key = keys[i];
                    if ($scope.stories[key].status == status.name) stories[key] = $scope.stories[key];
                }
                return stories;
            };

            $scope.$on('storyDeleted', function () {
                $scope.getStories();
                $scope.resetForm();
            });

            $scope.getStories();
        }]);
