angular.module('Angello.Common')
    .factory('FirebaseLoginService', function($rootScope, $firebaseSimpleLogin, EndpointConfigService) {
        var isFirebase = EndpointConfigService.getCurrentBackend() === 'firebase';

        $rootScope.$on('$firebaseSimpleLogin:login', function (e, u) {
            $rootScope.$broadcast('onLogin');
        });

        $rootScope.$on('$firebaseSimpleLogin:logout', function (e) {
            $rootScope.$broadcast('onLogout');
        });

        $rootScope.$on('$firebaseSimpleLogin:error', function (e, err) {
            $rootScope.$broadcast('onLogout');
        });

        return isFirebase ? $firebaseSimpleLogin(new Firebase(EndpointConfigService.getCurrentURI())) : '';
    })
;
