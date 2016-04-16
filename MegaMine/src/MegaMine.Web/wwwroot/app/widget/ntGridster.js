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
                        + '<li class="widget" gridster-item="item.widgetOptions" ng-repeat="item in widgets">'
                            + '<nt-widget id="{{item.dashboardPageWidgetId}}" widget="item.widget"></nt-nvd3>'
                        + '</li>'
                    + '</ul>'
                + '</div>'
    };

    function link(scope, element, attrs, nullController) {
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
                start: function (event, $element, widgetOptions) {
                },

                // optional callback fired when item is resized,
                resize: function (event, $element, widgetOptions) {
                    $timeout(function () {
                        widgetOptions.chart.api.update();
                    }, 50)
                },

                // optional callback fired when item is finished resizing 
                stop: function (event, $element, widgetOptions) {
                    $timeout(function () {
                        widgetOptions.chart.api.update();
                    }, 400)
                }
            },
        };

    }
}
