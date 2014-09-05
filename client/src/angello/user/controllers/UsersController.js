angular.module('Angello.User')
    .controller('UsersCtrl', function ($scope, $log, UsersModel) {
        var myUsers = this;

        myUsers.newUser = { name: '', email: '' };
        myUsers.users = {};

        myUsers.getUsers = function () {
            UsersModel.all()
                .then(function (result) {

                    myUsers.users = (result !== 'null') ? result : {};
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('ERROR', reason);
                });
        };

        myUsers.addUser = function () {
            UsersModel.create(angular.copy(myUsers.newUser))
                .then(function (result) {
                    myUsers.getUsers();
                    myUsers.newUser = { name: '', email: '' };
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('ERROR', reason);
                });
        };

        myUsers.updateUser = function (id, user) {
            UsersModel.update(id, user)
                .then(function (result) {
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('ERROR', reason);
                });
        };

        myUsers.removeUser = function (id) {
            UsersModel.destroy(id)
                .then(function (result) {
                    myUsers.getUsers();
                    $log.debug('RESULT', result);
                }, function (reason) {
                    $log.debug('ERROR', reason);
                });
        };

        myUsers.getUsers();
    });
