'use strict';

describe('Loading Service', function () {
    var $rootScope, LoadingService;

    beforeEach(module('Angello.Common'));

    beforeEach(inject(function (_$rootScope_, _LoadingService_) {
        $rootScope = _$rootScope_;
        LoadingService = _LoadingService_;
    }));

    it('should update $rootScope to false when setLoading is set to false',
        function () {
            LoadingService.setLoading(false);
            expect($rootScope.loadingView).toEqual(false);
    });

    it('should update $rootScope to true when setLoading is set to true',
        function () {
            LoadingService.setLoading(true);
            expect($rootScope.loadingView).toEqual(true);
    });
});