angular.module('Angello.Login')
    .controller('LoginCtrl',
        function ($scope, $location, AuthService) {
            var login = this;

            login.user = {
                email: '',
                password: '',
                register: false
            };

            login.submit = function (email, password, register) {
                if (login.loginForm.$valid) {
                    ((register) ? AuthService.register : AuthService.login)(email, password);
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

            $scope.$on('$firebaseSimpleLogin:login', function (e, user) {
                $location.path('/');
            });

            $scope.$on('$firebaseSimpleLogin:error', function (e, err) {
                console.log('ERROR', err);
            });
        });
