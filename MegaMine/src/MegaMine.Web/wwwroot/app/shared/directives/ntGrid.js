'use strict';
angular.module('megamine').directive('ntGrid', ntGrid)
ntGrid.$inject = ['uiGridConstants'];

function ntGrid(uiGridConstants) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=',
            options: '=',
            cssClass: '@',
            view: '='
        },
        link: link,
        template: '<md-content layout-padding>'
                        + '<div class="nt-grid" ui-grid="options" ui-grid-resize-columns ui-grid-auto-resize ui-grid-exporter ui-grid-selection ng-class="cssClass"></div>'
                    + '</md-content>'

    };

    function link(scope, element, attrs, nullController, transclude) {
        scope.cssClass = scope.cssClass === undefined ? 'main-grid' : scope.cssClass;
        initialize(scope.options, scope.data, 'main-content', scope.cssClass, 24);
    }

    function initialize(options, data, contentClass, cssClass, bottomOffset) {
        options.enableColumnResizing = true,
        options.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER,
        options.data = data;

        //setting the grid API
        options.onRegisterApi = function (gridApi) {
            options.gridApi = gridApi;
        };
    }

}


