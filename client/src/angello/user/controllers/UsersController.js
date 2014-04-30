angular.module('Angello.User')
    .controller('UsersCtrl', ['$scope', 'UsersService', function ($scope, UsersService) {
        $scope.newUser = { name: '', email: '' };
        $scope.users = {};

        $scope.getUsers = function () {
            UsersService.find().then(function (result) {
                $scope.users = (result !== 'null') ? result : {};
            }, function (reason) {
                console.log('ERROR', reason);
            });
        };

        $scope.addUser = function () {
            UsersService.create(angular.copy($scope.newUser)).then(function (result) {
                $scope.getUsers();
                $scope.newUser = { name: '', email: '' };
            }, function (reason) {
                console.log('ERROR', reason);
            });
        };

        $scope.updateUser = function (id, user) {
            UsersService.update(id, user).then(function (result) {
                // console.log('RESULT', result);
            }, function (reason) {
                console.log('ERROR', reason);
            });
        };

        $scope.removeUser = function (id) {
            UsersService.destroy(id).then(function (result) {
                $scope.getUsers();
            }, function (reason) {
                console.log('ERROR', reason);
            });
        };

        $scope.getUsers();
    }]);
