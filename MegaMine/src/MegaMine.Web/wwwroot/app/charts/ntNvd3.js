'use strict';
angular.module('megamine').directive('ntNvd3', ntNvd3)
ntNvd3.$inject = ['$timeout', 'profile'];

function ntNvd3($timeout, profile) {
    var directive = {
        config: { visible: false }
    }

    return {
        restrict: 'E',
        scope: {
            widget: '=',
            events: '='
        },
        link: link,
        template: '<div class="box">'
                    + '<div class="box-header">'
                        + '<h3>{{ widget.name }}</h3>'
                    + '</div>'
                    + '<div class="box-content">'
                        + '<nvd3 options="widget.chart.options"'
                              + 'data="widget.chart.data"'
                              + 'api="widget.chart.api"'
                              + 'config="{ visible: false }"'
                              + 'on-ready="onReady"'
                              + 'events="events"></nvd3>'
                    + '</div>'
                + '</div>'

    };

    function link(scope, element, attrs, nullController) {
        var nvd3Scope = undefined;
        scope.onReady = function (childScope, element) {
            nvd3Scope = childScope;

            $timeout(function () {
                nvd3Scope.config.visible = true;
                nvd3Scope.api.update();
            }, 50)

            //alert('ready');
        }

        //scope.$on('gridster-item-resized', function (sizes, gridster) {
        //    if (nvd3Scope !== undefined) {
        //        $timeout(function () {
        //            nvd3Scope.api.update();
        //        }, 50)
        //        //alert('updated')
        //    }
        //    //alert('resized');
        //})

        scope.$on('gridster-item-initialized', function (item) {
            // item.$element
            // item.gridster
            // item.row
            // item.col
            // item.sizeX
            // item.sizeY
            // item.minSizeX
            // item.minSizeY
            // item.maxSizeX
            // item.maxSizeY
            //alert('gridster-item-initialized')
        })
        //scope.$on('gridster-item-initialized', function (item) {
        //    if (nvd3Scope !== undefined) {
        //        nvd3Scope.config.visible = true;
        //        nvd3Scope.api.update();
        //        alert('updated')
        //    }
        //});
    }
}
