'use strict';
angular.module('megamine').directive('ntGrid', ntGrid)
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
                        + '<div ui-grid="vm.gridOptions" ui-grid-resize-columns ui-grid-auto-resize ui-grid-exporter ui-grid-selection ng-style="{\'height\' : vm.gridOptions.gridHeight }" ng-class="gridClass"></div>'
                    + '</md-content>'

    };

    function link(scope, element, attrs, nullController, transclude) {

        angular.extend(scope.vm.gridOptions,  { enableGridMenu: true, exporterMenuCsv:  true, exporterMenuPdf:  true});

        scope.gridClass = scope.gridClass === undefined ? 'main-grid' : scope.gridClass;
    }
}


