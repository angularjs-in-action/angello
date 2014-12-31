angular.module('Angello.Storyboard')
    .controller('StoryboardCtrl',
    function ($scope, $log, StoriesModel, UsersModel, STORY_STATUSES, STORY_TYPES) {
        var myStory = this;

        myStory.detailsVisible = true;
        myStory.currentStoryId = null;
        myStory.currentStory = null;
        myStory.editedStory = {};
        myStory.stories = [];

        myStory.types = STORY_TYPES;
        myStory.statuses = STORY_STATUSES;

        myStory.users = {};

        UsersModel.all()
            .then(function (result) {
                myStory.users = (result !== 'null') ? result : {};
                $log.debug('RESULT', result);
            }, function (reason) {
                $log.debug('REASON', reason);
            });

        myStory.setCurrentStory = function (story) {
            $log.debug(story);
            myStory.currentStoryId = story.id;
            myStory.currentStory = story;
            myStory.editedStory = angular.copy(myStory.currentStory);
        };

        myStory.getStories = function () {
            StoriesModel.all().then(function (result) {
                myStory.stories = (result !== 'null') ? result : {};
                $log.debug('RESULT', result);
            }, function (reason) {
                $log.debug('REASON', reason);
            });
        };

        myStory.createStory = function () {
            StoriesModel.create(myStory.editedStory)
                .then(function (result) {
                    myStory.getStories();
                    myStory.resetForm();
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('ERROR', reason);
                });
        };

        myStory.updateStory = function () {
            var fields = ['title', 'description', 'criteria', 'status', 'type', 'reporter', 'assignee'];

            fields.forEach(function (field) {
                myStory.currentStory[field] = myStory.editedStory[field]
            });

            StoriesModel.update(myStory.currentStoryId, myStory.editedStory)
                .then(function (result) {
                    myStory.getStories();
                    myStory.resetForm();
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('REASON', reason);
                });
        };

        myStory.updateCancel = function () {
            myStory.resetForm();
        };

        myStory.showMessages = function (field) {
            return myStory.detailsForm[field].$touched || myStory.detailsForm.$submitted
        };

        myStory.resetForm = function () {
            myStory.currentStory = null;
            myStory.editedStory = {};

            myStory.detailsForm.$setPristine();
            myStory.detailsForm.$setUntouched();
        };

        myStory.setDetailsVisible = function (visible) {
            myStory.detailsVisible = visible;
        };

        $scope.$on('storyDeleted', function () {
            myStory.getStories();
            myStory.resetForm();
        });

        myStory.getStories();
    });
