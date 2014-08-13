'use strict';

describe('Controller: UsersCtrl', function () {
    var $q, scope, ctrl, UsersModel;

    beforeEach(module('Angello'));

    beforeEach(inject(function($rootScope, $controller, _$q_, _UsersModel_) {
        $q = _$q_;
        UsersModel = _UsersModel_;
        spyOn(UsersModel, 'all').and.returnValue($q.when('fakeUsers'));
        scope = $rootScope.$new();
        ctrl = $controller('UsersCtrl', {$scope: scope});
    }));

    it('sets scope.newUser to a default value', function () {
        expect(scope.newUser).toEqual({name: '', email: ''});
    })

    describe('#getUsers', function () {
        it('sets scope.users based on the UsersModel', function () {
            var users = null;
            scope.getUsers();
            scope.$apply();
            expect(scope.users).toEqual('fakeUsers');
        });
    });
  });
