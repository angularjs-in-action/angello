'use strict';

describe('Stories Model', function () {

    beforeEach(module('Angello.Common'));

    afterEach(inject(function($httpBackend) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it('Should get all', inject(function(StoriesModel, $httpBackend, $rootScope) {
        var response = [];
        $httpBackend.when(
            'GET', 'https://my-first-angello.firebaseio.com/clients/1/stories/.json'
        ).respond(response);

        $rootScope.$broadcast('onCurrentUserId', 1);

        var promise = StoriesModel.all();
        $httpBackend.flush();
        
        promise.then(function(result) {
            expect(result).toEqual(response);
        });
        $rootScope.$digest();
    }));

    it('Should fetch', inject(function(StoriesModel, $httpBackend, $rootScope) {
        var response = {};
        $httpBackend.when(
            'GET', 'https://my-first-angello.firebaseio.com/clients/1/stories/1.json'
        ).respond(response);

        $rootScope.$broadcast('onCurrentUserId', 1);

        var promise = StoriesModel.fetch(1);
        $httpBackend.flush();

        promise.then(function(result) {
            expect(result.data).toEqual(response);
        });
        $rootScope.$digest();
    }));

    it('Should create', inject(function(StoriesModel, $httpBackend, $rootScope) {
        var response = {};
        $httpBackend.when(
            'POST', 'https://my-first-angello.firebaseio.com/clients/1/stories/.json'
        ).respond(response);

        $rootScope.$broadcast('onCurrentUserId', 1);

        var promise = StoriesModel.create({});
        $httpBackend.flush();

        promise.then(function(result) {
            expect(result.data).toEqual(response);
        });
        $rootScope.$digest();
    }));

    it('Should update', inject(function(StoriesModel, $httpBackend, $rootScope) {
        var response = {};
        $httpBackend.when(
            'PUT', 'https://my-first-angello.firebaseio.com/clients/1/stories/1.json'
        ).respond(response);

        $rootScope.$broadcast('onCurrentUserId', 1);

        var promise = StoriesModel.update(1, {});
        $httpBackend.flush();

        promise.then(function(result) {
            expect(result.data).toEqual(response);
        });
        $rootScope.$digest();
    }));

    it('Should destroy', inject(function(StoriesModel, $httpBackend, $rootScope) {
        var response = {};
        $httpBackend.when(
            'DELETE', 'https://my-first-angello.firebaseio.com/clients/1/stories/1.json'
        ).respond(response);

        $rootScope.$broadcast('onCurrentUserId', 1);

        var promise = StoriesModel.destroy(1);
        $httpBackend.flush();

        promise.then(function(result) {
            expect(result.data).toEqual(response);
        });
        $rootScope.$digest();
    }));
});