angular.module('Angello.User')
    .controller('UsersCtrl', function ($scope, UsersService) {
        var myUsers = this;

        myUsers.newUser = { name: '', email: '' };
        myUsers.users = {};

        myUsers.getUsers = function () {
            UsersService.all().then(function (result) {
                myUsers.users = (result.data !== 'null') ? result.data : {};
            }, function (reason) {
                console.log('ERROR', reason);
            });
        };

        myUsers.addUser = function () {
            UsersService.create(angular.copy(myUsers.newUser)).then(function (result) {
                myUsers.getUsers();
                myUsers.newUser = { name: '', email: '' };
            }, function (reason) {
                console.log('ERROR', reason);
            });
        };

        myUsers.updateUser = function (id, user) {
            UsersService.update(id, user).then(function (result) {
                // console.log('RESULT', result);
            }, function (reason) {
                console.log('ERROR', reason);
            });
        };

        myUsers.removeUser = function (id) {
            UsersService.destroy(id).then(function (result) {
                myUsers.getUsers();
            }, function (reason) {
                console.log('ERROR', reason);
            });
        };

        myUsers.getUsers();
    });
