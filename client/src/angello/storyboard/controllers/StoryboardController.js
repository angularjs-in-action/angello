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

        myStory.isEmptyStatus = function (status) {
            var empty = true;
            if (myStory.stories) {
                myStory.stories.forEach(function (story) {
                    if (story.status === status) empty = false;
                });
            }

            return empty;
        };

        myStory.finalizeDrop = function (story) {
            StoriesModel.update(story.id, story)
                .then(function (result) {
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('REASON', reason);
                });
        };

        myStory.changeStatus = function (story, status) {
            story.status = status.name;
        };

        myStory.insertAdjacent = function (target, story, insertBefore) {
            if (target === story) return;

            var fromIdx = myStory.stories.indexOf(story);
            var toIdx = myStory.stories.indexOf(target);

            if (!insertBefore) toIdx++;

            if (fromIdx >= 0 && toIdx >= 0) {
                myStory.stories.splice(fromIdx, 1);

                if (toIdx >= fromIdx) toIdx--;

                myStory.stories.splice(toIdx, 0, story);

                story.status = target.status;
            }
        };

        $scope.$on('storyDeleted', function () {
            myStory.getStories();
            myStory.resetForm();
        });

        myStory.getStories();
    });
