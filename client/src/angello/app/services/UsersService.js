angular.module('Angello.Common')
    .factory('UsersService', ['$http', '$q', 'AuthService', 'ENDPOINT_URI',
        function ($http, $q, AuthService, ENDPOINT_URI) {
            var find = function () {
                var deferred = $q.defer();
                var url = ENDPOINT_URI + 'clients/' + AuthService.getCurrentUserId() + '/users.json';

                $http.get(url).success(deferred.resolve).error(deferred.reject);

                return deferred.promise;
            };

            var fetch = function (user_id) {
                var deferred = $q.defer();
                var url = ENDPOINT_URI + 'clients/' + AuthService.getCurrentUserId() + '/users/' + user_id + '.json';

                $http.get(url).success(deferred.resolve).error(deferred.reject)

                return deferred.promise;
            };

            var create = function (user) {
                var deferred = $q.defer();
                var url = ENDPOINT_URI + 'clients/' + AuthService.getCurrentUserId() + '/users.json';

                $http.post(url, user).success(deferred.resolve).error(deferred.reject);

                return deferred.promise;
            };

            var update = function (user_id, user) {
                var deferred = $q.defer();
                var url = ENDPOINT_URI + 'clients/' + AuthService.getCurrentUserId() + '/users/' + user_id + '.json';

                $http.put(url, user).success(deferred.resolve).error(deferred.reject);

                return deferred.promise;
            };

            var destroy = function (user_id) {
                var deferred = $q.defer();
                var url = ENDPOINT_URI + 'clients/' + AuthService.getCurrentUserId() + '/users/' + user_id + '.json';

                $http.delete(url).success(deferred.resolve).error(deferred.reject);

                return deferred.promise;
            };

            return {
                find: find,
                fetch: fetch,
                create: create,
                update: update,
                destroy: destroy
            };
        }]);