'use strict';

describe('Stories Model', function () {

    beforeEach(module('Angello.Common'));

    beforeEach(module(function($provide) {
        $provide.value('AuthModel', {
            getCurrentUserId: function(){
                return 1;
            }
        });

        $provide.constant('ENDPOINT_URI', 'http://test.com/');
    }));

    afterEach(inject(function($httpBackend) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it('Should get all', inject(function(StoriesModel, $httpBackend, $rootScope) {
        var response = {};
        $httpBackend.when('GET', 'http://test.com/clients/1/stories/.json').respond(response);

        var promise = StoriesModel.all();
        $httpBackend.flush();
        
        promise.then(function(result) {
            expect(result.data).toEqual(response);
        });
        $rootScope.$digest();
    }));

    it('Should fetch', inject(function(StoriesModel, $httpBackend, $rootScope) {
        var response = {};
        $httpBackend.when('GET', 'http://test.com/clients/1/stories/1.json').respond(response);

        var promise = StoriesModel.fetch(1);
        $httpBackend.flush();

        promise.then(function(result) {
            expect(result.data).toEqual(response);
        });
        $rootScope.$digest();
    }));

    it('Should create', inject(function(StoriesModel, $httpBackend, $rootScope) {
        var response = {};
        $httpBackend.when('POST', 'http://test.com/clients/1/stories/.json').respond(response);

        var promise = StoriesModel.create({});
        $httpBackend.flush();

        promise.then(function(result) {
            expect(result.data).toEqual(response);
        });
        $rootScope.$digest();
    }));

    it('Should update', inject(function(StoriesModel, $httpBackend, $rootScope) {
        var response = {};
        $httpBackend.when('PUT', 'http://test.com/clients/1/stories/1.json').respond(response);

        var promise = StoriesModel.update(1, {});
        $httpBackend.flush();

        promise.then(function(result) {
            expect(result.data).toEqual(response);
        });
        $rootScope.$digest();
    }));

    it('Should destroy', inject(function(StoriesModel, $httpBackend, $rootScope) {
        var response = {};
        $httpBackend.when('DELETE', 'http://test.com/clients/1/stories/1.json').respond(response);

        var promise = StoriesModel.destroy(1);
        $httpBackend.flush();

        promise.then(function(result) {
            expect(result.data).toEqual(response);
        });
        $rootScope.$digest();
    }));
});