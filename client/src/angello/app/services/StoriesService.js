angular.module('Angello.Common')
    .factory('StoriesService', ['$http', '$q', 'AuthService', 'ENDPOINT_URI',
        function ($http, $q, AuthService, ENDPOINT_URI) {
            var find = function () {
                var deferred = $q.defer();
                var url = ENDPOINT_URI + 'clients/' + AuthService.getCurrentUserId() + '/stories.json';

                $http.get(url).success(deferred.resolve).error(deferred.reject);

                return deferred.promise;
            };

            var fetch = function (story_id) {
                var deferred = $q.defer();
                var url = ENDPOINT_URI + 'clients/' + AuthService.getCurrentUserId() + '/stories/' + story_id + '.json';

                $http.get(url).success(deferred.resolve).error(deferred.reject)

                return deferred.promise;
            };

            var create = function (story) {
                var deferred = $q.defer();
                var url = ENDPOINT_URI + 'clients/' + AuthService.getCurrentUserId() + '/stories.json';

                $http.post(url, story).success(deferred.resolve).error(deferred.reject);

                return deferred.promise;
            };

            var update = function (story_id, story) {
                var deferred = $q.defer();
                var url = ENDPOINT_URI + 'clients/' + AuthService.getCurrentUserId() + '/stories/' + story_id + '.json';

                $http.put(url, story).success(deferred.resolve).error(deferred.reject);

                return deferred.promise;
            };

            var destroy = function (story_id) {
                var deferred = $q.defer();
                var url = ENDPOINT_URI + 'clients/' + AuthService.getCurrentUserId() + '/stories/' + story_id + '.json';

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