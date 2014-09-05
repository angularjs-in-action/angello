angular.module('Angello.Common')
    .service('UsersModel',
    function ($http, AuthModel, ENDPOINT_URI, UtilsService) {
        var service = this;

        if (ENDPOINT_URI.BACKEND == 'firebase') {
            var root = 'clients/',
                format = ".json",
                path = "/users/";
        } else {
            var root = 'api/clients/',
                format = "",
                path = "/users/";
        }

        function getUrl(postfix) {
            return ENDPOINT_URI.URI + root + AuthModel.getCurrentUserId() + postfix;
        }

        function getUrlForId(user_id) {
            return getUrl(path) + user_id + format;
        }

        service.all = function () {
            return $http.get(getUrl(path + format))
                    .then(
                        function(result) {
                            return UtilsService.objectToArray(result);
                        }
                    );
            ;
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