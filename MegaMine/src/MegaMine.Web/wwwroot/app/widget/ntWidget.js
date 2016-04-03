'use strict';
angular.module('megamine').directive('ntWidget', ntWidget)
ntWidget.$inject = ['$timeout', 'utility'];

function ntWidget($timeout, utility) {
    return {
        restrict: 'E',
        scope: {
            widget: '=',
            id: '@'
        },
        link: link,
        template: '<div class="box" ng-style="maximizeStyle">'
                    + '<div class="box-header">'
                        + '<h3>{{ widget.name }}</h3>'
                            + '<div class="box-header-btns pull-right">'
                                + '<a title="Settings" ng-click="openSettings($event)"><i class="fa fa-cog"></i></a>'
                                + '<a title="Maximize" ng-click="maximize()" ng-hide="maxiInd"><i class="fa fa-maximize"></i></a>'
                                + '<a title="Minimize" ng-click="minimize()" ng-show="maxiInd"><i class="fa fa-minimize"></i></a>'
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
        var nvd3Scope = {};

        scope.remove = function () {
            var index = 0;
            var widgets = scope.widget.dashboard.widgets;
            for (var index = 0; index < widgets.length; index++) {
                if (scope.id == widgets[index].dashboardWidgetId)
                    break;
            }
            widgets.splice(index, 1);
        }

        scope.refresh = function () {
            nvd3Scope.api.update();
        }

        nvd3(scope, nvd3Scope);
        mixiMini(scope, nvd3Scope);

        scope.openSettings = function (ev) { openSettings(scope, ev); };
    }

    function nvd3(scope, nvd3Scope) {
        scope.onReady = function (childScope, element) {
            angular.extend(nvd3Scope, childScope);

            $timeout(function () {
                nvd3Scope.config.visible = true;
                //nvd3Scope.api.update();
            }, 100)
        }

        scope.$on('gridster-resized', function (sizes, gridster) {
            if (nvd3Scope !== undefined) {
                $timeout(function () {
                    nvd3Scope.api.update();
                }, 100)
            }
        })
    }

    function mixiMini(scope, nvd3Scope) {
        scope.maxiInd = false;
        scope.maximizeStyle = {};

        //var currentStyle = undefined;

        scope.maximize = function () {
            scope.maxiInd = true;

            angular.extend(scope.maximizeStyle, {
                                            width: scope.$parent.gridster.$element.width(),
                                            height: utility.getContentHeight('main-content', 'portal-content', 50),
                                            position: 'absolute',
                                            top: '35px',
                                            left: '5px'
                                        });

            angular.forEach(scope.$parent.gridsterItem.$element.siblings(), function (item) {
                angular.element(item).addClass('hide')
            })
            scope.$parent.gridsterItem.$element.addClass('show');
            angular.element(".chart-bar").scrollTop(0);
            $timeout(function () {
                nvd3Scope.api.update();
            }, 500)
        }

        scope.minimize = function () {
            scope.maxiInd = false;
            angular.forEach(scope.$parent.gridsterItem.$element.siblings(), function (item) {
                angular.element(item).removeClass('hide')
            })
            scope.$parent.gridsterItem.$element.removeClass('show');
            Object.keys(scope.maximizeStyle).forEach(function (key) { delete scope.maximizeStyle[key]; });
            $timeout(function () {
                nvd3Scope.api.update();
            }, 500)
        }
    }

    function openSettings(scope, ev) {
        scope.widget.dashboard.widgetSettings(ev, scope.widget, scope.widget.dashboard, scope.id)
    }
}
