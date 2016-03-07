'use strict'

angular.module('megamine').factory('dialogUtility', dialogUtility);
dialogUtility.$inject = ['$mdDialog'];

function dialogUtility($mdDialog) {
    var util = {
        alert: alert,
        confirm: confirm
    };

    return util;

    function alert(title, content, ev) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .title(title)
            .content(content)
            .ariaLabel(title)
            .ok('Ok')
            .targetEvent(ev)
        );
    }

    function confirm(title, content, ev) {
        var dialog = $mdDialog.confirm()
          .parent(angular.element(document.body))
          .title(title)
          .content(content)
          .ariaLabel(title)
          .ok('Yes')
          .cancel('No')
          .targetEvent(ev);
        return $mdDialog.show(dialog);
    }
}
