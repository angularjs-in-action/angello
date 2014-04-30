angular.module('Angello.Common')
    .factory('AuthService', ['$rootScope', 'LoadingService', '$firebaseSimpleLogin', 'ENDPOINT_URI',
        function ($rootScope, LoadingService, $firebaseSimpleLogin, ENDPOINT_URI) {
            var $scope = $rootScope.$new(false);
            $scope.user = null;
            $scope.loginService = $firebaseSimpleLogin(new Firebase(ENDPOINT_URI));

            var getCurrentUser = function () {
                return $scope.loginService.$getCurrentUser();
            };

            var login = function (email, password) {
                LoadingService.setLoading(true);

                $scope.loginService.$login('password', { email: email, password: password });
            };

            var logout = function () {
                LoadingService.setLoading(true);

                $scope.loginService.$logout();
            };

            var register = function (email, password) {
                LoadingService.setLoading(true);

                $scope.loginService.$createUser(email, password);
            };

            var changePassword = function (email, oldPassword, newPassword) {
                LoadingService.setLoading(true);

                $scope.loginService.changePassword(email, oldPassword, newPassword);
            };

            var user = function () {
                return $scope.user;
            };

            var existy = function (x) {
                return x != null;
            };

            var userExists = function () {
                return existy($scope.user) && existy($scope.user.id);
            };

            var getCurrentUserId = function () {
                return userExists() ? $scope.user.id : null;
            };

            $rootScope.$on('$firebaseSimpleLogin:login', function (e, user) {
                $scope.user = user;
                LoadingService.setLoading(false);
                $rootScope.$broadcast('onLogin');
            });

            $rootScope.$on('$firebaseSimpleLogin:logout', function (e) {
                $scope.user = null;
                LoadingService.setLoading(false);
                $rootScope.$broadcast('onLogout');
            });

            $rootScope.$on('$firebaseSimpleLogin:error', function (e, err) {
                $scope.user = null;
                LoadingService.setLoading(false);
                $rootScope.$broadcast('onLogout');
            });

            return {
                getCurrentUser: getCurrentUser,
                getCurrentUserId: getCurrentUserId,
                user: user,
                login: login,
                logout: logout,
                register: register,
                changePassword: changePassword
            }
        }]);
