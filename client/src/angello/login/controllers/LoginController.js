angular.module('Angello.Login')
    .controller('LoginCtrl',
        function ($scope, $location, $log, LoginService) {
            var login = this;

            LoginService.login({
              container: 'login-container'
            }, function() {
              $location.path('/');
            }, function(error) {
              $log.error("There's an error logging in", error);
            });
        });
