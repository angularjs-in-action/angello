'use strict';

describe('Controller: MainCtrl', function () {
    var $location, scope, ctrl, AuthModel;

    beforeEach(module('Angello'));

    beforeEach(inject(function($rootScope, $controller, _$location_, _AuthModel_) {
        $location = _$location_;
        AuthModel = _AuthModel_;
        scope = $rootScope.$new();
        ctrl = $controller('MainCtrl', {$scope: scope});
    }));

    describe('#logout', function() {
        it('logs out via the AuthModel', function () {
            spyOn(AuthModel, 'logout');
            scope.logout();
            expect(AuthModel.logout).toHaveBeenCalled();
        })
    });

    describe('onLogin event', function () {
        it('sets scope.currentUser to the logged in user', function () {
            spyOn(AuthModel, 'user').and.returnValue('fakeUser');
            scope.$broadcast('onLogin');
            scope.$apply();
            expect(scope.currentUser).toEqual('fakeUser');
        })
    });

    describe('onLogout event', function () {
        it('removes scope.currentUser', function () {
            scope.currentUser = {};
            scope.$broadcast('onLogout');
            scope.$apply();
            expect(scope.currentUser).toEqual(null);
        });

        it('redirects to /login', function() {
            spyOn($location, 'path');
            scope.$broadcast('onLogout');
            scope.$apply();
            expect($location.path).toHaveBeenCalledWith('login');
        });
    });
});
