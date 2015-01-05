angular.module('Angello.Common', [])
    .controller('MainCtrl', function MainCtrl($location) {
        var main = this;

        main.logout = function() {
            $location.path('login');
        };
    });
