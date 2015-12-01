'use strict'

angular.module('megamine').factory('template', template);
template.$inject = ['constants'];

function template(constants) {
    var vm = {
        getButtonDefaultColumnDefs: getButtonDefaultColumnDefs,
        getButtonColumnDefs: getButtonColumnDefs
    };

    init();
    return vm;

    function init() {
    }

    function getButtonDefaultColumnDefs(field, editClaimModule, editClaim, hide) {
        return getButtonColumnDefs(field, [{ buttonType: constants.enum.buttonType.view }, { buttonType: constants.enum.buttonType.edit, claimModule: editClaimModule, claim: editClaim }], hide);
    }

    function getButtonColumnDefs(field, buttons, hide) {
        var buttonDef =  {
            name: field, field: field, displayName: '', enableColumnMenu: false, type: 'string',
            cellTemplate: '',
            cellClass: 'text-center', enableHiding: false
        }

        var title;
        var icon;
        angular.forEach(buttons, function (button) {
            switch (button.buttonType) {
                case constants.enum.buttonType.view:
                    title = 'View';
                    icon = 'eye';
                    button.ngClick = button.ngClick === undefined ? 'grid.appScope.vm.viewDialog(row.entity, ' + constants.enum.dialogMode.view + ', $event)' : button.ngClick;
                    break;
                case constants.enum.buttonType.edit:
                    title = 'Edit';
                    icon = 'edit';
                    button.ngClick = button.ngClick === undefined ? 'grid.appScope.vm.viewDialog(row.entity, ' + constants.enum.dialogMode.save + ', $event)' : button.ngClick;
                    break;
                case constants.enum.buttonType.delete:
                    title = 'Delete';
                    icon = 'delete';
                    button.ngClick = button.ngClick === undefined ? 'grid.appScope.vm.viewDialog(row.entity, ' + constants.enum.dialogMode.delete + ', $event)' : button.ngClick;
                    break;
            }
            buttonDef.cellTemplate += '<em-button class="md-raised" title="' + title + '" ng-click="' + button.ngClick + '" ';
            if (button.claimModule !== undefined && button.claim !== undefined) {
                buttonDef.cellTemplate += 'module="' + button.claimModule + '" claim="' + button.claim + '" ';
            }
            buttonDef.cellTemplate += '><md-icon class="icon-button" md-svg-icon="content/images/icons/common/' + icon + '.svg"></md-icon></em-button>'
        });

        if (hide !== undefined) {
        buttonDef.cellTemplate = '<span ng-hide="{{' + hide + '}}">' + buttonDef.cellTemplate + '</span>';
        }

        return buttonDef;

    }

}