angular.module('Angello.Login')
    .controller('LoginCtrl',
        function ($scope, $location, $log, AuthModel) {
            var login = this;

            login.user = {
                email: '',
                password: '',
                register: false
            };

            login.submit = function (email, password, register) {
                if (login.loginForm.$valid) {
                    ((register) ? AuthModel.register : AuthModel.login)(email, password);
                    login.reset();
                }
            };

            login.reset = function () {
                login.user = {
                    email: '',
                    password: '',
                    register: false
                };
            };

            $scope.$on('onLogin', function (e, user) {
                $location.path('/');
            });

            $scope.$on('$firebaseSimpleLogin:error', function (e, err) {
                $log.debug('ERROR', err);
            });
        });
