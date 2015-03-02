angular.module('Angello.Common')
    .service('LoadingService',
        function ($rootScope) {
            var service = this;

            service.setLoading = function(loading) {
                $rootScope.loadingView = loading;
            };
        });
