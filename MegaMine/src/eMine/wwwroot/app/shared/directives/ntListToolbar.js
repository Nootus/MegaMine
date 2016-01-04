'use strict';
angular.module('megamine').directive('ntListToolbar', ntListToolbar)
ntListToolbar.$inject = [];

function ntListToolbar() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            vm: '=',
            title: '@',
            buttonText: '@',
            buttonIcon: '@',
            buttonClick: '&',
            claimModule: '@',
            claim: '@',
            toolbarClass: '@',
            gridClass: '@'
        },
        link: link,
        template: '<nt-toolbar title="{{title}}" class="{{toolbarClass}}">'
                        + '<span ng-transclude>'
                        +       '<nt-button ng-click="buttonClick({$event: $event})" button-icon="{{buttonIcon}}" button-text="{{buttonText}}" module="{{claimModule}}" claim="{{claim}}"></nt-button>'
                        + '</span>'
                    + '</nt-toolbar>'
                    + '<nt-grid vm="vm" grid-class="{{gridClass}}"></nt-grid>'

    };

    function link(scope, element, attrs, nullController, transclude) {
        scope.toolbarClass = scope.toolbarClass === undefined ? 'title' : scope.toolbarClass;
        scope.gridClass = scope.gridClass === undefined ? 'main-grid' : scope.gridClass;
        scope.buttonIcon = scope.buttonIcon === undefined ? 'add' : scope.buttonIcon;
    }
}
