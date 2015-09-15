'use strict';
angular.module('emine').directive('ntListToolbar', ntListToolbar)
ntListToolbar.$inject = [];

function ntListToolbar() {
    return {
        restrict: 'E',
        scope: {
            title: '@',
            addText: '@',
            vm: '=',
            claimModule: '@',
            claim: '@',
            ngClick: '=',
            gridClass: '@'
        },
        link: link,
        template: '<em-toolbar title="{{title}}" class="title">'
                        + '<em-button class="md-raised md-primary" aria-label="Add" ng-click="ngClick($event)" module="{{claimModule}}" claim="{{claim}}">'
                        + '<md-icon class="icon-button" md-svg-icon="content/images/icons/add.svg"></md-icon>Add {{addText}}'
                        + '</em-button>'
                    + '</em-toolbar>'
                    + '<md-content layout-padding>'
                        + '<div ui-grid="vm.gridOptions" ui-grid-resize-columns ui-grid-auto-resize ng-style="{\'height\' : vm.gridHeight }" ng-class="gridClass"></div>'
                    + '</md-content>'

    };

    function link(scope, element, attrs, nullController, transclude) {
        scope.gridClass = scope.gridClass === undefined ? 'main-grid' : scope.gridClass;
    }
}
