angular.module('Angello.Storyboard')
    .directive('sortable', function (StoriesService) {
        var linker = function (scope, element, attrs) {
            var status = scope.status.name;

            element.sortable({
                items: 'li',
                connectWith: ".list",
                receive: function (event, ui) {
                    var prevScope = angular.element(ui.item.prev()).scope();
                    var curScope = angular.element(ui.item).scope();

                    scope.$apply(function () {
                        // TODO Fix the entire drag and drop to order mechanism
                        // StoriesService.insertStoryAfter(curScope.story, prevScope.story);
                        // curScope.story.status = status; // Update the status
                    });
                }
            });
        };

        return {
            restrict: 'A',
            link: linker
        };
    });