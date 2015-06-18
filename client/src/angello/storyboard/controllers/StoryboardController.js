angular.module('Angello.Storyboard')
    .controller('StoryboardCtrl',
        function ($scope, $log, StoriesModel, UsersModel,
                    STORY_STATUSES, STORY_TYPES) {
        var storyboard = this;

        storyboard.detailsVisible = true;
        storyboard.currentStoryId = null;
        storyboard.currentStory = null;
        storyboard.editedStory = {};
        storyboard.stories = [];

        storyboard.types = STORY_TYPES;
        storyboard.statuses = STORY_STATUSES;

        storyboard.users = {};

        UsersModel.all()
            .then(function (result) {
                storyboard.users = (result !== null && result.length > 0) ? result : [{name: 'Please create a user'}];
                $log.debug('RESULT', result);
            }, function (reason) {
                $log.debug('REASON', reason);
            });

        storyboard.setCurrentStory = function (story) {
            $log.debug(story);
            storyboard.currentStoryId = story.id;
            storyboard.currentStory = story;
            storyboard.editedStory = angular.copy(storyboard.currentStory);
        };

        storyboard.getStories = function () {
            StoriesModel.all()
                .then(function (result) {
                    storyboard.stories = (result !== 'null') ? result : {};
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('REASON', reason);
                });
        };

        storyboard.createStory = function () {
            StoriesModel.create(storyboard.editedStory)
                .then(function (result) {
                    storyboard.getStories();
                    storyboard.resetForm();
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('ERROR', reason);
                });
        };

        storyboard.updateStory = function () {
            var fields = ['title', 'description', 'criteria', 'status', 'type', 'reporter', 'assignee'];

            fields.forEach(function (field) {
                storyboard.currentStory[field] = storyboard.editedStory[field]
            });

            StoriesModel.update(storyboard.currentStoryId, storyboard.editedStory)
                .then(function (result) {
                    storyboard.getStories();
                    storyboard.resetForm();
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('REASON', reason);
                });
        };

        storyboard.updateCancel = function () {
            storyboard.resetForm();
        };

        storyboard.showMessages = function (field) {
            return storyboard.detailsForm[field].$touched
                && storyboard.detailsForm[field].$invalid;
        };

        storyboard.resetForm = function () {
            storyboard.currentStory = null;
            storyboard.editedStory = {};

            storyboard.detailsForm.$setPristine();
            storyboard.detailsForm.$setUntouched();
        };

        storyboard.setDetailsVisible = function (visible) {
            storyboard.detailsVisible = visible;
        };

        storyboard.isEmptyStatus = function (status) {
            var empty = true;
            if (storyboard.stories) {
                storyboard.stories.forEach(function (story) {
                    if (story.status === status) empty = false;
                });
            }

            return empty;
        };

        storyboard.insertAdjacent = function (target, story, insertBefore) {
            if (target === story) return;

            var fromIdx = storyboard.stories.indexOf(story);
            var toIdx = storyboard.stories.indexOf(target);

            if (!insertBefore) toIdx++;

            if (fromIdx >= 0 && toIdx >= 0) {
                storyboard.stories.splice(fromIdx, 1);

                if (toIdx >= fromIdx) toIdx--;

                storyboard.stories.splice(toIdx, 0, story);

                story.status = target.status;
            }
        };

        storyboard.finalizeDrop = function (story) {
            StoriesModel.update(story.id, story)
                .then(function (result) {
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('REASON', reason);
                });
        };

        storyboard.changeStatus = function (story, status) {
            story.status = status.name;
        };

        $scope.$on('storyDeleted', function () {
            storyboard.getStories();
            storyboard.resetForm();
        });

        storyboard.getStories();
    });
