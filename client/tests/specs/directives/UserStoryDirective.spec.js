'use strict';

describe('userstory Directive', function () {
    var userStory,
        element,
        StoriesModel,
        $rootScope;

    beforeEach(module('Angello.User'));

    beforeEach(inject(function($q, $compile, _$rootScope_, _StoriesModel_) {
        $rootScope = _$rootScope_;

        var directiveMarkup = angular.element('<li userstory></li>');
        element = $compile(directiveMarkup)($rootScope);
        userStory = element.scope().userStory;

        StoriesModel = _StoriesModel_;

        spyOn(StoriesModel, 'destroy').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve('data');
            return deferred.promise;
        });

        spyOn($rootScope,'$broadcast').and.callThrough();
    }));

    it('should delete a story', function() {
        userStory.deleteStory('0');

        expect(StoriesModel.destroy).toHaveBeenCalledWith('0');

        $rootScope.$digest();

        expect($rootScope.$broadcast).toHaveBeenCalledWith('storyDeleted');
    });
});