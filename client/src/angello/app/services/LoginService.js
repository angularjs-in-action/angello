angular.module('Angello.Common')
    .service('LoginService',
        function ($rootScope, LoadingService, EndpointConfigService, auth, store,
            CURRENT_BACKEND, $log, $location, jwtHelper) {
            var service = this;

            function saveUserAndProfile(profile, token) {
              store.set('profile', profile);
              $rootScope.$broadcast('onLogin', profile);
              $rootScope.$broadcast('onCurrentUserId', profile.user_id);
              store.set('id_token', token);
            }

            var loginCallback;
            if (CURRENT_BACKEND === 'firebase') {
                loginCallback = function(onLogin, error) {
                  return function(profile, token) {
                    saveUserAndProfile(profile, token);
                    auth.getToken({
                        api: 'firebase'
                    }).then(function(token) {
                        store.set('userToken', token.id_token);
                        onLogin(profile, token.id_token);
                    }, function(err) {
                        error(err);
                        $log.error("Error getting Firebase token", err);
                    });
                  }
                };
            } else {
                loginCallback = function(onLogin) {
                  return function(profile, token) {
                    saveUserAndProfile(profile, token);
                    store.set('userToken', token);
                    onLogin(profile, token);
                  }
                };
            }

            service.login = function(opts, ok, error) {
                var options = angular.extend({
                    closable: false
                }, opts);
                auth.signin(options, loginCallback(ok, error), error)
            };

            service.authenticateUser = function() {
              if (!auth.isAuthenticated) {
                var token = store.get('id_token');
                if (!token || jwtHelper.isTokenExpired(token)) {
                  $location.path('/login');
                } else {
                  var profile = store.get('profile');
                  auth.authenticate(profile, token);
                  $rootScope.$broadcast('onCurrentUserId', profile.user_id);
                }
              }

            }

            service.logout = function() {
                store.remove('id_token');
                store.remove('profile');
                store.remove('userToken');
                $rootScope.$broadcast('onCurrentUserId', null);
                $location.path('/login');
            }

            service.getCurrentUser = function () {
                return store.get('profile');
            };

            service.getCurrentUserId = function () {
                var user = service.getCurrentUser();
                return user ? user.user_id : null;
            };
    });
;
