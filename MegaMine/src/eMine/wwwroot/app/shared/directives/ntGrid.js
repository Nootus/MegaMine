'use strict';
angular.module('emine').directive('ntGrid', ntGrid)
ntGrid.$inject = [];

function ntGrid() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            vm: '=',
            gridClass: '@'
        },
        link: link,
        template: '<md-content layout-padding>'
                        + '<div ui-grid="vm.gridOptions" ui-grid-resize-columns ui-grid-auto-resize ng-style="{\'height\' : vm.gridOptions.gridHeight }" ng-class="gridClass"></div>'
                    + '</md-content>'

    };

    function link(scope, element, attrs, nullController, transclude) {
        scope.gridClass = scope.gridClass === undefined ? 'main-grid' : scope.gridClass;
    }
}


