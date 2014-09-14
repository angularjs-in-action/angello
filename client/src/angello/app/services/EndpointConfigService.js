angular.module('Angello.Common')
    // .constant('CURRENT_BACKEND', 'node')
    .constant('CURRENT_BACKEND', 'firebase')
    .service('EndpointConfigService', function(AuthModel, CURRENT_BACKEND) {
        var service = this,
            endpointMap = {
                firebase: { URI: 'https://angello.firebaseio.com/', root: 'clients/', format: '.json' },
                node: { URI: 'http://localhost:3000/', root: 'api/clients/', format: ''}
            },
            currentEndpoint = endpointMap[CURRENT_BACKEND];

        service.getUrl = function(model) {
            return currentEndpoint.URI + currentEndpoint.root + AuthModel.getCurrentUserId() + model;
        };

        service.getUrlForId = function(model, id) {
            return service.getUrl(model) + id + currentEndpoint.format;
        };

        service.getCurrentBackend = function() {
            return backend;
        };

        service.getCurrentFormat = function() {
            return currentEndpoint.format;
        };

        service.getCurrentURI = function() {
            return currentEndpoint.uri;
        };
    });