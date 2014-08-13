angular.module('Angello.User')
    .directive('userstory', function ($rootScope, StoriesService, $log) {
        var linker = function (scope, element, attrs) {
            element
                .mouseover(function () {
                    element.css({ 'opacity': 0.9 });
                })
                .mouseout(function () {
                    element.css({ 'opacity': 1.0 })
                });
        };

        var controller = function () {
            var userStory = this;
            userStory.deleteStoryBoard = function (id) {
                StoriesService.destroy(id)
                    .then(function (result) {
                        $rootScope.$broadcast('storyDeleted');
                        $log.debug('RESULT', result);
                    }, function (reason) {
                        $log.debug('ERROR', reason);
                    });
            };
        };

        return {
            restrict: 'A',
            controller: controller,
            controllerAs: 'userStory',
            link: linker
        };
    });