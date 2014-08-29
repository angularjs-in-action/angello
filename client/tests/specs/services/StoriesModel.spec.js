'use strict';

describe('Stories Model', function () {
    var $http;

    beforeEach(module('Angello.Common'));

    beforeEach(module(function($provide) {
        $provide.value('AuthModel', {
            getCurrentUserId: function(){
                return 1;
            }
        });

        $provide.value('ENDPOINT_URI', function(){
            return 'http://test.com';
        })
    }));

    afterEach(inject(function($httpBackend) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it('test1', inject(function(StoriesModel, $httpBackend, $rootScope) {
        var response = {a:3};
        $httpBackend.when('GET', 'https://angello.firebaseio.com/clients/1/stories/.json').respond(response);

        var promise = StoriesModel.all();
        $httpBackend.flush();
        
        promise.then(function(result) {
            expect(result.data).toEqual(response);
        });
        $rootScope.$digest();
    })); 

    it('test1', inject(function(StoriesModel, $httpBackend, $rootScope) {
        var response = {a:4};
        $httpBackend.when('GET', 'https://angello.firebaseio.com/clients/2/stories/.json').respond(response);

        var promise = StoriesModel.all();
        $httpBackend.flush();
        
        promise.then(function(result) {
            expect(result.data).toEqual(response);
        });
        $rootScope.$digest();
    })); 
});