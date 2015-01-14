'use strict';

beforeEach(module('Angello.Storyboard'));

var ctrl, scope, element, compile;

describe('StoryboardCtrl', function () {

    beforeEach(inject(function ($controller) {
        ctrl = $controller('StoryboardCtrl', {});
        ctrl.detailsForm = {
            $setPristine: function () { },
            $setUntouched: function () {  }
        };
    }));

    it('should initialize currentStory, editedStory, stories, types, statuses, and users', function () {
        expect(ctrl.currentStory).toBeNull();

        expect(ctrl.editedStory).toBeDefined();
        expect(ctrl.editedStory).not.toBeNull();

        expect(ctrl.stories.length).toEqual(2);
        expect(ctrl.stories[0].id).toEqual('1');

        expect(ctrl.types.length).toEqual(4);
        expect(ctrl.types[0].name).toEqual('Feature');

        expect(ctrl.statuses.length).toEqual(5);
        expect(ctrl.statuses[0].name).toEqual('To Do');

        expect(ctrl.users.length).toEqual(2);
        expect(ctrl.users[0].id).toEqual('1');
    });

    it('should reset the form', function () {
        ctrl.currentStory = {assignee: '1'};
        ctrl.editedStory = ctrl.currentStory;

        ctrl.resetForm();

        expect(ctrl.currentStory).toBeNull();

        expect(ctrl.editedStory).toBeDefined();
        expect(ctrl.editedStory).not.toBeNull();
    });

    it('should cancel the form', function () {
        ctrl.editedStory = ctrl.currentStory = {assignee: '1'};

        ctrl.updateCancel();

        expect(ctrl.currentStory).toBeNull();

        expect(ctrl.editedStory).toBeDefined();
        expect(ctrl.editedStory).not.toBeNull();
    });

    it('should set current story', function () {
        var story = {assignee: '1'};
        ctrl.setCurrentStory(story);

        expect(ctrl.currentStory.assignee).toEqual('1');
        expect(ctrl.editedStory).toEqual(ctrl.currentStory);
    });

    it('should create a story', function () {
        var oldLength = ctrl.stories.length;
        ctrl.editedStory = {assignee: '1'};

        ctrl.createStory();

        expect(ctrl.stories.length).toBeGreaterThan(oldLength);
    });

    it('should update a story', function () {
        var story = ctrl.stories[0],
            title = 'Updated Story';

        ctrl.setCurrentStory(story);
        ctrl.editedStory.title = title;
        ctrl.updateStory();

        expect(story.title).toEqual(title);
    });

    it('should delete a story', function () {
        var oldLength = ctrl.stories.length;

        ctrl.deleteStory('1');

        expect(ctrl.stories.length).toBeLessThan(oldLength);
    });
});