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
        expect(ctrl).toBeInitialized();
    });

    it('should reset the form', function () {
        ctrl.editedStory = ctrl.currentStory = {assignee: '1'};

        ctrl.resetForm();

        expect(ctrl.currentStory).toBeNull();
        expect(ctrl.editedStory).toEqual({});
    });

    it('should cancel the form', function () {
        ctrl.editedStory = ctrl.currentStory = {assignee: '1'};

        ctrl.updateCancel();

        expect(ctrl.currentStory).toBeNull();
        expect(ctrl.editedStory).toEqual({});
    });

    it('should set current story', function () {
        var story = {assignee: '1'};

        ctrl.setCurrentStory(story);

        expect(ctrl.currentStory).toEqual(story);
        expect(ctrl.editedStory).toEqual(ctrl.currentStory);
    });

    it('should create a story', function () {
        var l = ctrl.stories.length,
            story = {assignee: '1'};

        ctrl.editedStory = story;
        ctrl.createStory();
        ctrl.stories[l].id = '3';

        expect(ctrl.stories).toContain(story);
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
        var story = ctrl.stories[0];

        ctrl.deleteStory(story.id);

        expect(ctrl.stories).not.toContain(story);
    });
});