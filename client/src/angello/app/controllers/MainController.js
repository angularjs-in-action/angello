angular.module('Angello.Common')
    .controller('MainCtrl', MainCtrl);
function MainCtrl($scope, $location, LoginService) {
    var main = this;
    main.currentUser = null;

    $scope.$on('onCurrentUserId', function (ctx, id) {
        main.currentUser = LoginService.getCurrentUser();
    });

    main.logout = function() {
        LoginService.logout();
        main.currentUser = null;
    };
};
