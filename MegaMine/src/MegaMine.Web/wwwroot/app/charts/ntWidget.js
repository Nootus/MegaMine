'use strict';
angular.module('megamine').directive('ntWidget', ntWidget)
ntWidget.$inject = ['$timeout'];

function ntWidget($timeout) {
    return {
        restrict: 'E',
        scope: {
            widget: '='
        },
        link: link,
        template: '<div class="box">'
                    + '<div class="box-header">'
                        + '<h3>{{ widget.name }}</h3>'
                            + '<div class="box-header-btns pull-right">'
                                + '<a title="Settings" ng-click="openSettings()"><i class="fa fa-cog"></i></a>'
                                + '<a title="Maximize" ng-click="maximize()"><i class="fa fa-maximize"></i></a>'
                                + '<a title="Refresh" ng-click="refresh()"><i class="fa fa-refresh"></i></a>'
                                + '<a title="Remove widget" ng-click="remove()"><i class="fa fa-trash"></i></a>'
                            + '</div>'
                    + '</div>'
                    + '<div class="box-content">'
                        + '<nvd3 options="widget.chart.options"'
                              + 'data="widget.chart.data"'
                              + 'api="widget.chart.api"'
                              + 'config="{ visible: false }"'
                              + 'on-ready="onReady"'
                              + '></nvd3>'
                    + '</div>'
                + '</div>'

    };

    function link(scope, element, attrs, nullController) {
        var nvd3Scope = undefined;
        scope.onReady = function (childScope, element) {
            nvd3Scope = childScope;

            $timeout(function () {
                nvd3Scope.config.visible = true;
                //nvd3Scope.api.update();
            }, 50)
        }

        scope.$on('gridster-resized', function (sizes, gridster) {
            if (nvd3Scope !== undefined) {
                $timeout(function () {
                    nvd3Scope.api.update();
                })
            }
        })

        scope.remove = function () {
            scope.widget.widgets.splice(scope.widget.widgets.indexOf(scope.widget), 1);
        }
    }
}
