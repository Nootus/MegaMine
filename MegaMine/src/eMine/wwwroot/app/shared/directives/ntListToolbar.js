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
        template: '<nt-toolbar-button title="{{title}}" button-text="Add {{addText}}" button-icon="add" claim-module="{{claimModule}}" claim="{{claim}}" ng-click="ngClick"></nt-toolbar-button>'
                    + '<nt-grid vm="vm" grid-class="{{gridClass}}"></nt-grid>'

    };

    function link(scope, element, attrs, nullController, transclude) {
        //scope.gridClass = scope.gridClass === undefined ? 'main-grid' : scope.gridClass;
    }
}
