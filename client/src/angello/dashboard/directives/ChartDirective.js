angular.module('Angello.Dashboard')
    .directive('chart',
        function () {
            var parseDataForCharts = function (sourceArray, sourceProp,
                referenceArray, referenceProp) {

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
                scope.$watch('sourceArray', function () {
                    scope.data = parseDataForCharts(
                        scope.sourceArray,
                        attrs['sourceProp'],
                        scope.referenceArray,
                        attrs['referenceProp']
                    );

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
                });
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