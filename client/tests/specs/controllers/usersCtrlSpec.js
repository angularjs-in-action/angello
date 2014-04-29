'use strict';

describe('Controller: UsersCtrl', function () {
    var $q, scope, ctrl, UsersService;

    beforeEach(module('Angello'));

    beforeEach(inject(function($rootScope, $controller, _$q_, _UsersService_) {
        $q = _$q_;
        UsersService = _UsersService_;
        spyOn(UsersService, 'find').and.returnValue($q.when('fakeUsers'));
        scope = $rootScope.$new();
        ctrl = $controller('UsersCtrl', {$scope: scope});
    }));

    it('sets scope.newUser to a default value', function () {
        expect(scope.newUser).toEqual({name: '', email: ''});
    })

    describe('#getUsers', function () {
        it('sets scope.users based on the UsersService', function () {
            var users = null;
            scope.getUsers;
            scope.$apply();
            expect(scope.users).toEqual('fakeUsers');
        });
    });
  });
