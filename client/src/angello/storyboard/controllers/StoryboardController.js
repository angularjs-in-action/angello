angular.module('Angello.Storyboard')
    .controller('StoryboardCtrl',
        function ($scope, StoriesService, UsersService, STORY_STATUSES, STORY_TYPES) {
            var myStory = this;

            myStory.detailsVisible = true;
            myStory.currentStoryId = null;
            myStory.currentStory = null;
            myStory.editedStory = {};
            myStory.stories = [];

            myStory.types = STORY_TYPES;
            myStory.statuses = STORY_STATUSES;

            myStory.users = {};

            UsersService.all()
                .then(function (result) {
                    myStory.users = (result.data !== 'null') ? result.data : {};
                }, function (reason) {
                    console.log('ERROR', reason);
                });


            myStory.setCurrentStory = function (id, story) {
                console.log(id, story)
                myStory.currentStoryId = id;
                myStory.currentStory = story;
                myStory.editedStory = angular.copy(myStory.currentStory);
            };

            myStory.getStories = function () {
                StoriesService.all().then(function (result) {
                    myStory.stories = (result.data !== 'null') ? result.data : {};
                }, function (reason) {
                    console.log('ERROR', reason);
                });
            };

            myStory.createStory = function () {
                StoriesService.create(myStory.editedStory).then(function (result) {
                    myStory.getStories();
                    myStory.resetForm();
                }, function (reason) {
                    console.log('ERROR', reason);
                });
            };

            myStory.updateStory = function () {
                var fields = ['title', 'description', 'criteria', 'status', 'type', 'reporter', 'assignee'];

                fields.forEach(function (field) {
                    myStory.currentStory[field] = myStory.editedStory[field]
                });

                StoriesService.update(myStory.currentStoryId, myStory.editedStory).then(function (result) {
                    myStory.getStories();
                    myStory.resetForm();
                }, function (reason) {
                    console.log('ERROR', reason);
                });
            };

            myStory.updateCancel = function () {
                myStory.resetForm();
            };

            myStory.resetForm = function () {
                myStory.currentStory = null;
                myStory.editedStory = {};

                myStory.detailsForm.$setPristine();
            };

            myStory.setDetailsVisible = function (visible) {
                myStory.detailsVisible = visible;
            };

            myStory.storiesWithStatus = function (status) {
                var stories = {};
                var keys = Object.keys(myStory.stories);
                for (var i = 0, len = keys.length; i < len; i++) {
                    var key = keys[i];
                    if (myStory.stories[key].status == status.name) stories[key] = myStory.stories[key];
                }
                return stories;
            };

            $scope.$on('storyDeleted', function () {
                myStory.getStories();
                myStory.resetForm();
            });

            myStory.getStories();
        });
