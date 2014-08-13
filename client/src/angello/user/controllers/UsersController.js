angular.module('Angello.User')
    .controller('UsersCtrl', function ($scope, $log, UsersService) {
        var myUsers = this;

        myUsers.newUser = { name: '', email: '' };
        myUsers.users = {};

        myUsers.getUsers = function () {
            UsersService.all()
                .then(function (result) {
                    myUsers.users = (result.data !== 'null') ? result.data : {};
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('ERROR', reason);
                });
        };

        myUsers.addUser = function () {
            UsersService.create(angular.copy(myUsers.newUser))
                .then(function (result) {
                    myUsers.getUsers();
                    myUsers.newUser = { name: '', email: '' };
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('ERROR', reason);
                });
        };

        myUsers.updateUser = function (id, user) {
            UsersService.update(id, user)
                .then(function (result) {
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('ERROR', reason);
                });
        };

        myUsers.removeUser = function (id) {
            UsersService.destroy(id)
                .then(function (result) {
                    myUsers.getUsers();
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('ERROR', reason);
                });
        };

        myUsers.getUsers();
    });
