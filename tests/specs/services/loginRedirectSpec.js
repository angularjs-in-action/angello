'use strict';

describe('Login redirection', function () {
    var $location, $rootScope, $q, AuthService;

    beforeEach(module('Angello'));

    beforeEach(inject(function (_$location_, _$rootScope_, _$q_, _AuthService_) {
        $location = _$location_;
        $rootScope = _$rootScope_;
        $q = _$q_;
        AuthService = _AuthService_;
    }));

    describe('when the user is not logged in', function () {
        beforeEach(function () {
            spyOn(AuthService, 'getCurrentUser').and.returnValue($q.when(null));
        });

        it('should redirect to /login', function () {

        });
    });

    describe('when the user is logged in', function () {
        beforeEach(function () {
            spyOn(AuthService, 'getCurrentUser').and.returnValue($q.when({id: 1}));
        });

        it('should not redirect', function () {

        });
    });
});
