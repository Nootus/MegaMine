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
                        + '<div class="nt-grid" ui-grid="vm.gridOptions" ui-grid-resize-columns ui-grid-auto-resize ui-grid-exporter ui-grid-selection ng-class="gridClass"></div>'
                    + '</md-content>'

    };

    function link(scope, element, attrs, nullController, transclude) {

        //angular.extend(scope.vm.gridOptions, { enableGridMenu: true, exporterMenuCsv: true, exporterMenuPdf: false, gridMenuShowHideColumns:false });

        scope.gridClass = scope.gridClass === undefined ? 'main-grid' : scope.gridClass;
    }
}


