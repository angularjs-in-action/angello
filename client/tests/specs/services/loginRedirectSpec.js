'use strict';

describe('Login redirection', function () {
    var $location, $rootScope, $q, AuthModel;

    beforeEach(module('Angello'));

    beforeEach(inject(function (_$location_, _$rootScope_, _$q_, _AuthModel_) {
        $location = _$location_;
        $rootScope = _$rootScope_;
        $q = _$q_;
        AuthModel = _AuthModel_;
    }));

    describe('when the user is not logged in', function () {
        beforeEach(function () {
            spyOn(AuthModel, 'getCurrentUser').and.returnValue($q.when(null));
        });

        it('should redirect to /login', function () {

        });
    });

    describe('when the user is logged in', function () {
        beforeEach(function () {
            spyOn(AuthModel, 'getCurrentUser').and.returnValue($q.when({id: 1}));
        });

        it('should not redirect', function () {

        });
    });
});
