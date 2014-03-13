'use strict';

describe('Controller: UserCtrl', function () {
    var scope, ctrl;
    var user = {};
    var stories = {
        1: { assignee: 1 },
        2: { assignee: 2 },
        3: { assignee: 1 }
    };

    beforeEach(module('Angello'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('UserCtrl', {
            $scope: scope,
            $routeParams: {
                userId: 1
            },
            user: user,
            stories: stories
        });
    }));

    it('assigns the user to the scope', function() {
        expect(scope.userId).toEqual(1);
        expect(scope.user).toBe(user);
    });

    it('sets $scope.stories to the users assigned stories', function() {
        expect(scope.stories).toEqual({
            1: {assignee: 1},
            3: {assignee: 1}
        });
    })
});
