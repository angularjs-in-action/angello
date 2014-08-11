angular.module('Angello.Common')
    .service('UsersService',
    function ($http, $q, AuthService, ENDPOINT_URI) {
        var service = this,
            root = 'clients/',
            format = ".json",
            path = "/users";

        function getUrl(postfix) {
            return ENDPOINT_URI + root + AuthService.getCurrentUserId() + postfix;
        };

        function getUrlForId(user_id) {
            return getUrl(path) + user_id + format;
        }

        service.all = function () {
            return $http.get(getUrl(path + format));
        };

        service.fetch = function (user_id) {
            return $http.get(getUrlForId(user_id));
        };

        service.create = function (user) {
            return $http.post(getUrl(path + format), user);
        };

        service.update = function (user_id, user) {
            return $http.put(getUrlForId(user_id), user);
        };

        service.destroy = function (user_id) {
            return $http.delete(getUrlForId(user_id));
        };
    });