'use strict';
angular.module('megamine').directive('ntToolbarButton', ntToolbarButton)
ntToolbarButton.$inject = [];

function ntToolbarButton() {
    return {
        restrict: 'E',
        scope: {
            title: '@',
            buttonText: '@',
            buttonIcon: '@',
            claimModule: '@',
            claim: '@',
            buttonClick: '&'
        },
        link: link,
        template: '<nt-toolbar title="{{title}}" class="title">'
                        + '<nt-button ng-click="buttonClick({$event: $event})" button-icon="{{buttonIcon}}" button-text="{{buttonText}}" module="{{claimModule}}" claim="{{claim}}"></nt-button>'
                    + '</nt-toolbar>'

    };

    function link(scope, element, attrs, nullController, transclude) {

    }
}
