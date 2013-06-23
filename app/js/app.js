var myModule = angular.module('Angello', []);

myModule.config(function ($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'}).
        when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: 'DashboardCtrl'}).
        otherwise({redirectTo: '/'});
})

myModule.directive('userstory', function () {
    var linker = function (scope, element, attrs) {

    };

    var controller = function ($scope) {

    };

    return {
        restrict: 'E',
        controller: controller,
        link: linker
    };
})

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

        if(element.is(":visible")){
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

    var controller = function ($scope) {
    };

    return {
        restrict: 'A',
        controller: controller,
        link: linker,
        scope: {
            sourceArray:'=',
            referenceArray:'='
        }
    };
})

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
    var getStatuses = function () {
        var tempArray = [
            {name: 'Back Log'},
            {name: 'To Do'},
            {name: 'In Progress'},
            {name: 'Code Review'},
            {name: 'QA Review'},
            {name: 'Verified'},
            {name: 'Done'}
        ];
        return tempArray;
    };

    var getTypes = function () {
        var tempArray = [
            {name: 'Feature'},
            {name: 'Enhancement'},
            {name: 'Bug'},
            {name: 'Spike'}
        ];
        return tempArray;
    };

    var getStories = function () {
        var tempArray = [
            {title: 'Story 00', description: 'Description pending.', criteria: 'Criteria pending.', status: 'To Do', type: 'Feature', reporter: 'Lukas Ruebbelke', assignee: 'Brian Ford'},
            {title: 'Story 01', description: 'Description pending.', criteria: 'Criteria pending.', status: 'Back Log', type: 'Feature', reporter: 'Lukas Ruebbelke', assignee: 'Brian Ford'},
            {title: 'Story 02', description: 'Description pending.', criteria: 'Criteria pending.', status: 'Code Review', type: 'Enhancement', reporter: 'Lukas Ruebbelke', assignee: 'Brian Ford'},
            {title: 'Story 03', description: 'Description pending.', criteria: 'Criteria pending.', status: 'Done', type: 'Enhancement', reporter: 'Lukas Ruebbelke', assignee: 'Brian Ford'},
            {title: 'Story 04', description: 'Description pending.', criteria: 'Criteria pending.', status: 'Verified', type: 'Bug', reporter: 'Lukas Ruebbelke', assignee: 'Brian Ford'},
            {title: 'Story 05', description: 'Description pending.', criteria: 'Criteria pending.', status: 'To Do', type: 'Spike', reporter: 'Lukas Ruebbelke', assignee: 'Brian Ford'}
        ];

        return tempArray;
    };

    return {
        getStatuses: getStatuses,
        getTypes: getTypes,
        getStories: getStories
    };
});

myModule.controller('MainCtrl', function ($scope, AngelloModel, AngelloHelper) {
    $scope.currentStory;

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
        $scope.stories.push({title: 'New Story', description: 'Description pending.', criteria: 'Criteria pending.', status: 'Back Log', type: 'Feature', reporter: 'Pending', assignee: 'Pending'});
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