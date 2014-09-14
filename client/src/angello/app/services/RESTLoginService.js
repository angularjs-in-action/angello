angular.module('Angello.Common')
    .service('RESTLoginService',
        function ($rootScope, $q, $http, LoadingService, EndpointConfigService, UserService) {
            var service = this;

            service.$getCurrentUser = function() {
                var deferred = $q.defer(),
                    user = UserService.getCurrentUser();

                deferred.resolve(user);
                return deferred.promise;
            };

            service.$login = function(type, creds) {
                $http.post(
                    EndpointConfigService.getCurrentURI() + 'api/clients/login',
                    creds
                )
                .then(
                    function(response) {

                        var id = response.data.userId,
                            access_token = response.data.id;

                        UserService.setCurrentUser(id, access_token)

                        $rootScope.$broadcast('onLogin');
                    },
                    function(error) {
                        console.log(error);
                        UserService.resetUser();
                        $rootScope.$broadcast('onLogout');
                    }
                );
            };

            service.$logout = function() {
                $http.post(
                    EndpointConfigService.getCurrentURI() + 'api/clients/logout'
                )
                .then(
                    function(response) {
                        UserService.resetUser();

                        $rootScope.$broadcast('onLogout');        
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            };

            service.$createUser = function(email, password) {
                $http.post(
                    EndpointConfigService.getCurrentURI() + 'api/clients',
                    {
                        email: email,
                        password: password
                    }
                )
                .then(
                    function(response) {
                        service.$login({}, {email:email, password:password});
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            };

            service.changePassword = function(email, oldPassword, newPassword) {
                // TODO
            };
    })
;
