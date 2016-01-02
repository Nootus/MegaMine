'use strict';
angular.module('megamine').directive('ntListToolbar', ntListToolbar)
ntListToolbar.$inject = [];

function ntListToolbar() {
    return {
        restrict: 'E',
        scope: {
            vm: '=',
            title: '@',
            claimModule: '@',
            claim: '@',
            addText: '@',
            addButtonClick: '&',
            gridClass: '@'
        },
        link: link,
        template: '<nt-toolbar-button title="{{title}}" button-text="Add {{addText}}" button-icon="add" button-click="addButtonClick({$event: $event})" claim-module="{{claimModule}}" claim="{{claim}}"></nt-toolbar-button>'
                    + '<nt-grid vm="vm" grid-class="{{gridClass}}"></nt-grid>'

    };

    function link(scope, element, attrs, nullController, transclude) {
        scope.gridClass = scope.gridClass === undefined ? 'main-grid' : scope.gridClass;
    }
}
