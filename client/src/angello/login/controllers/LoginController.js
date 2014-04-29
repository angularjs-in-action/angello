angular.module('Angello.Login', [])
    .controller('LoginCtrl', ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {
            $scope.user = {
                email: '',
                password: '',
                register: false
            };

            $scope.submit = function (email, password, register) {
                if ($scope.loginForm.$valid) {
                    ((register) ? AuthService.register : AuthService.login)(email, password);
                    $scope.reset();
                }
            };

            $scope.reset = function () {
                $scope.user = {
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
        }]);
