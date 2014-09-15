angular.module('Angello.Common')
    .service('AuthModel',
        function ($rootScope, LoadingService, CURRENT_BACKEND, RESTLoginService, FirebaseLoginService) {
            var service = this,
                user = null,
                loginService = CURRENT_BACKEND === 'firebase' ?  FirebaseLoginService : RESTLoginService;

            var existy = function (x) {
                return x != null;
            };

            var userExists = function () {
                return existy(user) && existy(user.id);
            };

            service.getCurrentUser = function () {
                return loginService.$getCurrentUser();
            };

            service.login = function (email, password) {
                LoadingService.setLoading(true);

                loginService.$login('password', { email: email, password: password });
            };

            service.logout = function () {
                LoadingService.setLoading(true);

                loginService.$logout();
            };

            service.register = function (email, password) {
                LoadingService.setLoading(true);

                loginService.$createUser(email, password);
            };

            service.changePassword = function (email, oldPassword, newPassword) {
                LoadingService.setLoading(true);

                loginService.changePassword(email, oldPassword, newPassword);
            };

            service.user = function () {
                return user;
            };

            service.getCurrentUserId = function () {
                return userExists() ? user.id : null;
            };

            $rootScope.$on('onLogin', function () {
                loginService.$getCurrentUser()
                    .then(function(currentUser) {
                        user = currentUser;
                        $rootScope.$broadcast('onCurrentUserId', currentUser.id);
                    });
                LoadingService.setLoading(false);
            });

            $rootScope.$on('onLogout', function (e) {
                user = null;
                $rootScope.$broadcast('onCurrentUserId', null);
                LoadingService.setLoading(false);
            });

        });
