angular.module('Angello.Common')
    .factory('FirebaseLoginService', function($rootScope, $firebaseSimpleLogin, EndpointConfigService) {
        $rootScope.$on('$firebaseSimpleLogin:login', function (e, u) {
            $rootScope.$broadcast('onLogin');
        });

        $rootScope.$on('$firebaseSimpleLogin:logout', function (e) {
            $rootScope.$broadcast('onLogout');
        });

        $rootScope.$on('$firebaseSimpleLogin:error', function (e, err) {
            $rootScope.$broadcast('onLogout');
        });

        return $firebaseSimpleLogin(new Firebase(EndpointConfigService.getCurrentURI()));
    })
;
