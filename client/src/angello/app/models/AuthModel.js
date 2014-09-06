angular.module('Angello.Common')
    .service('AuthModel',
        function ($rootScope, LoadingService, $firebaseSimpleLogin, ENDPOINT_URI, RESTLoginService) {
            var service = this,
                user = null,
                loginService = ENDPOINT_URI.BACKEND == 'firebase' ? $firebaseSimpleLogin(new Firebase(ENDPOINT_URI.URI)) : RESTLoginService;

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

            if (ENDPOINT_URI.BACKEND == 'firebase') {
                $rootScope.$on('$firebaseSimpleLogin:login', function (e, u) {
                    user = u;
                    LoadingService.setLoading(false);
                    $rootScope.$broadcast('onLogin');
                });

                $rootScope.$on('$firebaseSimpleLogin:logout', function (e) {
                    user = null;
                    LoadingService.setLoading(false);
                    $rootScope.$broadcast('onLogout');
                });

                $rootScope.$on('$firebaseSimpleLogin:error', function (e, err) {
                    user = null;
                    LoadingService.setLoading(false);
                    $rootScope.$broadcast('onLogout');
                });
            } else {
                $rootScope.$on('onLogin', function () {
                    loginService.$getCurrentUser()
                            .then(function(currentUser) {
                                user = currentUser;
                            });
                    LoadingService.setLoading(false);
                });

                $rootScope.$on('onLogout', function (e) {
                    user = null;
                    LoadingService.setLoading(false);
                });
            }

        });
