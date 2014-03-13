'use strict';

describe('Login redirection', function () {
    var $location, $rootScope, AuthService;

    beforeEach(module('Angello'));

    beforeEach(inject(function(_$location_, _$rootScope_, _AuthService_) {
      $location = _$location_;
      $rootScope = _$rootScope_;
      AuthService = _AuthService_;

      spyOn($location, 'path').andReturn('/users');
    }));

    describe('when the user is not logged in', function () {
        beforeEach(function() {
            spyOn(AuthService, 'getCurrentUserId').andReturn(null);
        });

        it('should redirect to /login', function () {
            $rootScope.$broadcast('$locationChangeStart');
            $rootScope.$apply();
            expect($location.path).toHaveBeenCalledWith('/login');
        });
    });

    describe('when the user is logged in', function() {
        beforeEach(function() {
            spyOn(AuthService, 'getCurrentUserId').andReturn(1);
        });

        it('should not redirect', function() {
            $rootScope.$broadcast('$locationChangeStart');
            $rootScope.$apply();
            expect($location.path).not.toHaveBeenCalledWith('/login');
        });
    });
});
