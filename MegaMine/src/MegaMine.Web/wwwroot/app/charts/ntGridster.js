'use strict';
angular.module('megamine').directive('ntGridster', ntGridster)
ntGridster.$inject = ['$timeout'];

function ntGridster($timeout) {
    return {
        restrict: 'E',
        scope: {
            widgets: '='
        },
        link: link,
        template: '<div gridster="gridsterOptions">'
                    + '<ul class="with-3d-shadow with-transitions">'
                        + '<li class="widget" gridster-item="widget" ng-repeat="widget in widgets">'
                            + '<nt-widget widget="widget"></nt-nvd3>'
                        + '</li>'
                    + '</ul>'
                + '</div>'
    };

    function link(scope, element, attrs, nullController) {
        //setting the widgets array as parent
        angular.forEach(scope.widgets, function(item) {
            item.widgets = scope.widgets;
        })

        scope.gridsterOptions = {
            margins: [35, 5],
            mobileModeEnabled: false,
            draggable: {
                handle: 'h3'
            },
            resizable: {
                enabled: true,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],

                //// optional callback fired when resize is started
                start: function (event, $element, widget) {
                },

                // optional callback fired when item is resized,
                resize: function (event, $element, widget) {
                    $timeout(function () {
                        if (widget.chart.api) widget.chart.api.update();
                    }, 50)
                },

                // optional callback fired when item is finished resizing 
                stop: function (event, $element, widget) {
                    $timeout(function () {
                        if (widget.chart.api) widget.chart.api.update();
                    }, 50)
                }
            },
        };

    }
}
