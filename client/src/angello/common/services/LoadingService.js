angular.module('Angello.Common', [])
    .factory('LoadingService', ['$rootScope',
        function ($rootScope) {
            var setLoading = function (loading) {
                $rootScope.loadingView = loading;
            };

            return {
                setLoading: setLoading
            }
        }]);
