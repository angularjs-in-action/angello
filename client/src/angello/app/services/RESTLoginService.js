angular.module('Angello.Common')
    .service('RESTLoginService',
        function ($rootScope, LoadingService, ENDPOINT_URI, $http, UserService, $q) {
            var service = this;

            service.$getCurrentUser = function() {
                /*var deferred = $q.defer(),
                    user = UserService.getCurrentUser();

                deferred.resolve(user);*/
                return UserService.getCurrentUser();
                // return deferred.promise;
            };

            service.$login = function(type, creds) {
                $http.post(
                    ENDPOINT_URI.URI + 'api/clients/login',
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
                    ENDPOINT_URI.URI + 'api/clients/logout'
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
                console.log(email, password);

                $http.post(
                    ENDPOINT_URI.URI + 'api/clients',
                    {
                        email: email,
                        password: password
                    }
                )
                .then(
                    function(response) {
                        $rootScope.$broadcast('onLogin');
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
