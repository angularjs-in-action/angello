angular.module('Angello.Common', [])
    .controller('MainCtrl', MainCtrl);
function MainCtrl($scope, $location, AuthService) {
    var main = this;
    main.currentUser = null;


    $scope.$on('onLogin', function () {
        main.currentUser = AuthService.user();
    });

    $scope.$on('onLogout', function () {
        main.currentUser = null;
        $location.path('login');
    });

    main.logout = function() {
        AuthService.logout();
    }

    AuthService.getCurrentUser();
};
