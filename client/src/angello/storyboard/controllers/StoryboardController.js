angular.module('Angello.Storyboard')
    .controller('StoryboardCtrl', function () {
        var myStory = this;

        myStory.currentStory = null;
        myStory.editedStory = {};
        myStory.stories = [
            {"assignee": "1", "criteria": "It tests!", "description": "This is a test", "id": "1", "reporter": "2", "status": "To Do", "title": "First Story", "type": "Spike"},
            {"assignee": "2", "description": "testing something", "id": "2", "reporter": "1", "status": "In Progress", "title": "Second Story", "type": "Enhancement"}
        ];

        myStory.types = [
            {name: 'Feature'},
            {name: 'Enhancement'},
            {name: 'Bug'},
            {name: 'Spike'}
        ];

        myStory.statuses = [
            {name: 'To Do'},
            {name: 'In Progress'},
            {name: 'Code Review'},
            {name: 'QA Review'},
            {name: 'Verified'}
        ];

        myStory.users = [
            {"email": "one@user.com", "name": "Lukas Ruebbelke", "id": "1"},
            {"email": "another@user.com", "name": "Another User", "id": "2"}
        ];

        myStory.setCurrentStory = function (story) {
            myStory.currentStory = story;
            myStory.editedStory = angular.copy(myStory.currentStory);
        };

        // Utility function for this example
        function ID() {
            return '_' + Math.random().toString(36).substr(2, 9);
        };

        myStory.createStory = function () {
            var newStory = angular.copy(myStory.editedStory);
            newStory.id = ID();

            myStory.stories.push(newStory);
            myStory.resetForm();
        };

        myStory.updateStory = function () {
            var fields = ['title', 'description', 'criteria', 'status', 'type', 'reporter', 'assignee'];

            fields.forEach(function (field) {
                myStory.currentStory[field] = myStory.editedStory[field]
            });

            myStory.resetForm();
        };

        myStory.deleteStory = function(storyId) {
            myStory.stories.remove(function(story) {
                return story.id === storyId;
            });

            myStory.resetForm();
        };

        myStory.updateCancel = function () {
            myStory.resetForm();
        };

        myStory.resetForm = function () {
            myStory.currentStory = null;
            myStory.editedStory = {};

            myStory.detailsForm.$setPristine();
            myStory.detailsForm.$setUntouched();
        };
    });
