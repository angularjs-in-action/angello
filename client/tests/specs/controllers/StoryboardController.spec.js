'use strict';

describe('StoryboardCtrl', function() {
    var ctrl;

    beforeEach(module('Angello.Storyboard'));

    beforeEach(inject(function($controller) {
        ctrl = $controller('StoryboardCtrl', {});
        ctrl.detailsForm = {
            $setPristine: function() { },
            $setUntouched: function() {  }
        };
    }));

    it('should initialize properties', function() {
        expect(ctrl.currentStory).toBeNull();
        expect(ctrl.editedStory).toEqual({});
        expect(ctrl.stories).toBeDefined();
        expect(ctrl.types).toBeDefined();
        expect(ctrl.statuses).toBeDefined();
        expect(ctrl.users).toBeDefined();
    });

    it('should reset the form', function() {
        ctrl.editedStory = ctrl.currentStory = {assignee: '1'};

        ctrl.resetForm();

        expect(ctrl.currentStory).toBeNull();
        expect(ctrl.editedStory).toEqual({});
    });

    it('should cancel the form', function() {
        ctrl.editedStory = ctrl.currentStory = {assignee: '1'};

        ctrl.updateCancel();

        expect(ctrl.currentStory).toBeNull();
        expect(ctrl.editedStory).toEqual({});
    });

    it('should set current story', function() {
        var story = {assignee: '1'};

        ctrl.setCurrentStory(story);

        expect(ctrl.currentStory).toEqual(story);
        expect(ctrl.editedStory).toEqual(ctrl.currentStory);
    });

    it('should create a story', function() {
        var story = {assignee: '1', id: '3'};

        ctrl.editedStory = story;
        ctrl.createStory();
        ctrl.stories[ctrl.stories.length - 1].id = '3';

        expect(ctrl.stories).toContain(story);
    });

    it('should update a story', function() {
        var story = ctrl.stories[0],
            title = 'Updated Story';

        ctrl.setCurrentStory(story);
        ctrl.editedStory.title = title;
        ctrl.updateStory();

        expect(story.title).toEqual(title);
    });

    it('should delete a story', function() {
        var story = ctrl.stories[0];

        ctrl.deleteStory(story.id);

        expect(ctrl.stories).not.toContain(story);
    });
});