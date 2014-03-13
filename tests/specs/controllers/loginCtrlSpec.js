'use strict';

describe('Controller: LoginCtrl', function () {
    var $location, scope, ctrl;

    beforeEach(module('Angello'));

    beforeEach(inject(function($rootScope, $controller, _$location_) {
        $location = _$location_;
        scope = $rootScope.$new();
        ctrl = $controller('LoginCtrl', {$scope: scope});
    }));

    describe('#reset', function () {
        it('sets scope.user to a default value', function () {
            scope.user = {};
            scope.reset();
            expect(scope.user).toEqual({
                email: '', password: '', register: false
            });
        })
    });

    describe('$firebaseSimpleLogin:login', function () {
        it('redirects to /', function() {
            spyOn($location, 'path');
            scope.$broadcast('$firebaseSimpleLogin:login');
            scope.$apply();
            expect($location.path).toHaveBeenCalledWith('/');
        });
    });
});
