'use strict';

describe('Stories Model', function () {
    var $http, StoriesModel;

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

    beforeEach(inject(function ($httpBackend, _StoriesModel_) {
        $http = $httpBackend;
        StoriesModel = _StoriesModel_;

        $http.when('GET', 'https://angello.firebaseio.com/clients/1/stories/.json').respond({
            '-JHSpH5x_TdTxmCSEgs6': {
                assignee: "-JHSp9umZMUEu6Dc7Wut",
                criteria: "It tests!",
                description: "This is a test",
                reporter: "-JHSp14iy601A1AKil5s",
                status: "To Do",
                title: "Test",
                type: "Feature"
        }});
    }));

    afterEach(function() {
        $http.verifyNoOutstandingExpectation();
        $http.verifyNoOutstandingRequest();
    });

    it('test', function () {
        StoriesModel.all();
        $http.flush();
    });
});