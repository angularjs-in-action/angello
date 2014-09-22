angular.module('Angello.Common', [])
    .controller('MainCtrl', MainCtrl);
function MainCtrl($scope, $location, AuthModel) {
    var main = this;
    main.currentUser = null;

    $scope.$on('onLogin', function () {
        $scope.$watch(function() {return AuthModel.user()}, function() {
            main.currentUser = AuthModel.user();
        });
    });

    $scope.$on('onLogout', function () {
        main.currentUser = null;
        $location.path('login');
    });

    main.logout = function() {
        AuthModel.logout();
    };

    AuthModel.getCurrentUser();
};
