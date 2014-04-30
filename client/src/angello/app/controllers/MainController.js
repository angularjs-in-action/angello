angular.module('Angello.Common', [])
    .controller('MainCtrl', ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {
            $scope.currentUser = null;

            $scope.logout = function () {
                AuthService.logout();
            };

            $scope.$on('onLogin', function () {
                $scope.currentUser = AuthService.user();
            });

            $scope.$on('onLogout', function () {
                $scope.currentUser = null;
                $location.path('login');
            });

            AuthService.getCurrentUser();
        }]);
