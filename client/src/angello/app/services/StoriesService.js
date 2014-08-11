angular.module('Angello.Common')
    .service('StoriesService',
        function ($http, $q, AuthService, ENDPOINT_URI) {
            var service = this,
                root = 'clients/',
                format = ".json",
                path = "/stories";

            function getUrl(postfix) {
                return ENDPOINT_URI + root + AuthService.getCurrentUserId() + postfix;
            };

            function getUrlForId(story_id) {
                return getUrl(path) + story_id + format;
            }

            service.all = function () {
                return $http.get(getUrl(path + format));
            };

            service.fetch = function (story_id) {
                return $http.get(getUrlForId(story_id));
            };

            service.create = function (story) {
                return $http.post(getUrl(path + format), story);
            };

            service.update = function (story_id, story) {
                return $http.put(getUrlForId(story_id), story);
            };

            service.destroy = function (story_id) {
                return $http.delete(getUrlForId(story_id));
            };
        });