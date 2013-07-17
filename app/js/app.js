var myModule = angular.module('Angello', []);

myModule.config(function ($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'}).
        when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: 'DashboardCtrl'}).
        otherwise({redirectTo: '/'});
});

myModule.directive('userstory', function (AngelloModel) {
    var linker = function (scope, element, attrs) {
        element.mouseover(function () {
            element.css({ 'opacity': 0.9 });
        }).mouseout(function () {
            element.css({ 'opacity': 1.0 })
        });
    };

    var controller = function ($scope) {
        $scope.deleteStory = function (id) {
            AngelloModel.deleteStory(id);
        };
    };

    return {
        restrict: 'A',
        controller: controller,
        link: linker
    };
});

myModule.directive('sortable', function (AngelloModel) {
    var linker = function (scope, element, attrs) {
        var status = scope.status.name;

        element.sortable({
            items: 'li',
            connectWith: ".list",
            receive: function (event, ui) {
                var prevScope = angular.element(ui.item.prev()).scope();
                var curScope = angular.element(ui.item).scope();

                scope.$apply(function () {
                    AngelloModel.insertStoryAfter(curScope.story, prevScope.story);
                    curScope.story.status = status; // Update the status
                });
            }
        });
    };

    return {
        restrict: 'A',
        link: linker
    };
});

myModule.directive('chart', function () {
    var parseDataForCharts = function (sourceArray, sourceProp, referenceArray, referenceProp) {
        var data = [];
        referenceArray.each(function (r) {
            var count = sourceArray.count(function (s) {
                return s[sourceProp] == r[referenceProp];
            });
            data.push([r[referenceProp], count]);
        });
        return data;
    };

    var linker = function (scope, element, attrs) {
        scope.data = parseDataForCharts(scope.sourceArray, attrs['sourceProp'], scope.referenceArray, attrs['referenceProp']);

        if (element.is(':visible')) {
            $.plot(element, [ scope.data ], {
                series: {
                    bars: {
                        show: true,
                        barWidth: 0.6,
                        align: "center"
                    }
                },
                xaxis: {
                    mode: "categories",
                    tickLength: 0
                }
            });
        }
    };

    return {
        restrict: 'A',
        link: linker,
        scope: {
            sourceArray: '=',
            referenceArray: '='
        }
    };
});

myModule.factory('AngelloHelper', function () {
    var buildIndex = function (source, property) {
        var tempArray = [];

        for (var i = 0, len = source.length; i < len; ++i) {
            tempArray[source[i][property]] = source[i];
        }

        return tempArray;
    };

    return {
        buildIndex: buildIndex
    };
});

myModule.factory('AngelloModel', function ($rootScope) {
    var statuses = [
        {name: 'To Do'},
        {name: 'In Progress'},
        {name: 'Code Review'},
        {name: 'QA Review'},
        {name: 'Verified'},
    ];

    var types = [
        {name: 'Feature'},
        {name: 'Enhancement'},
        {name: 'Bug'},
        {name: 'Spike'}
    ];

    var stories = [
        {id: 1, title: 'Story 00', description: 'Description pending.', criteria: 'Criteria pending.', status: 'To Do', type: 'Feature', reporter: 'Lukas Ruebbelke', assignee: 'Brian Ford'},
        {id: 2, title: 'Story 01', description: 'Description pending.', criteria: 'Criteria pending.', status: 'In Progress', type: 'Feature', reporter: 'Lukas Ruebbelke', assignee: 'Brian Ford'},
        {id: 3, title: 'Story 02', description: 'Description pending.', criteria: 'Criteria pending.', status: 'Code Review', type: 'Enhancement', reporter: 'Lukas Ruebbelke', assignee: 'Brian Ford'},
        {id: 4, title: 'Story 03', description: 'Description pending.', criteria: 'Criteria pending.', status: 'QA Review', type: 'Enhancement', reporter: 'Lukas Ruebbelke', assignee: 'Brian Ford'},
        {id: 5, title: 'Story 04', description: 'Description pending.', criteria: 'Criteria pending.', status: 'Verified', type: 'Bug', reporter: 'Lukas Ruebbelke', assignee: 'Brian Ford'},
        {id: 6, title: 'Story 05', description: 'Description pending.', criteria: 'Criteria pending.', status: 'To Do', type: 'Spike', reporter: 'Lukas Ruebbelke', assignee: 'Brian Ford'}
    ];

    var getStatuses = function () {
        return statuses;
    };

    var getTypes = function () {
        return types;
    };

    var getStories = function () {
        return stories;
    };

    var deleteStory = function (id) {
        stories.remove(function (s) {
            return s.id == id;
        });
    };

    var createStory = function (id) {
        stories.push({id: new Date().getTime(), title: 'New Story', description: 'Description pending.', criteria: 'Criteria pending.', status: 'To Do', type: 'Feature', reporter: 'Pending', assignee: 'Pending'});

        $rootScope.$broadcast('storiesChanged')
    };

    var insertStoryAfter = function(story, prevStory) {
        stories = stories.remove(function(t) {
            return t['id'] == story.id;
        });

        stories = stories.add(story, stories.findIndex(prevStory) + 1);
    };

    return {
        getStatuses: getStatuses,
        getTypes: getTypes,
        getStories: getStories,
        createStory: createStory,
        deleteStory: deleteStory,
        insertStoryAfter: insertStoryAfter
    };
});

myModule.controller('MainCtrl', function ($scope, AngelloModel, AngelloHelper) {
    $scope.currentStory = null;
    $scope.types = AngelloModel.getTypes();
    $scope.statuses = AngelloModel.getStatuses();
    $scope.stories = AngelloModel.getStories();
    $scope.typesIndex = AngelloHelper.buildIndex($scope.types, 'name');
    $scope.statusesIndex = AngelloHelper.buildIndex($scope.statuses, 'name');

    $scope.setCurrentStory = function (story) {
        $scope.currentStory = story;
        $scope.currentStatus = $scope.statusesIndex[story.status];
        $scope.currentType = $scope.typesIndex[story.type];
    };

    $scope.createStory = function () {
        AngelloModel.createStory();
    };

    $scope.setCurrentStatus = function (status) {
        if (typeof $scope.currentStory !== 'undefined') {
            $scope.currentStory.status = status.name;
        }
    };

    $scope.setCurrentType = function (type) {
        if (typeof $scope.currentStory !== 'undefined') {
            $scope.currentStory.type = type.name;
        }
    };
});

myModule.controller('DashboardCtrl', function ($scope, AngelloModel) {
    $scope.types = AngelloModel.getTypes();
    $scope.statuses = AngelloModel.getStatuses();
    $scope.stories = AngelloModel.getStories();
});