angular.module('Angello.Common')
    .service('UsersModel',
    function ($http, EndpointConfigService, UtilsService) {
        var service = this,
            MODEL = '/users/';

        service.all = function () {
            return $http.get(EndpointConfigService.getUrl(MODEL + EndpointConfigService.getCurrentFormat()))
                    .then(
                        function(result) {
                            return UtilsService.objectToArray(result);
                        }
                    );
        };

        service.fetch = function (user_id) {
            return $http.get(EndpointConfigService.getUrlForId(MODEL, user_id));
        };

        service.create = function (user) {
            return $http.post(EndpointConfigService.getUrl(MODEL + EndpointConfigService.getCurrentFormat()), user);
        };

        service.update = function (user_id, user) {
            return $http.put(EndpointConfigService.getUrlForId(MODEL, user_id), user);
        };

        service.destroy = function (user_id) {
            return $http.delete(EndpointConfigService.getUrlForId(MODEL, user_id));
        };
    });