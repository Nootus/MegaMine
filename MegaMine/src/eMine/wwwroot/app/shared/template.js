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

    function getButtonDefaultColumnDefs(field, claimModule, editClaim, deleteClaim, hide) {
        var buttons = [{ buttonType: constants.enum.buttonType.view }, { buttonType: constants.enum.buttonType.edit, claimModule: claimModule, claim: editClaim }];
        if (deleteClaim !== undefined) {
            buttons.push({ buttonType: constants.enum.buttonType.delete, claimModule: claimModule, claim: deleteClaim });
        }
            
        return getButtonColumnDefs(field, buttons, hide);
    }

    function getButtonColumnDefs(field, buttons, hide) {
        var buttonDef =  {
            name: field, field: field, displayName: '', enableColumnMenu: false, type: 'string',
            exporterSuppressExport: true,
            cellTemplate: '',
            cellClass: 'text-center', enableHiding: false
        }

        var title;
        var icon;
        var cssClass;
        angular.forEach(buttons, function (button) {
            switch (button.buttonType) {
                case constants.enum.buttonType.view:
                    title = 'View';
                    cssClass = 'view';
                    icon = 'eye';
                    button.ngClick = button.ngClick === undefined ? 'grid.appScope.vm.viewDialog(row.entity, ' + constants.enum.dialogMode.view + ', $event)' : button.ngClick;
                    break;
                case constants.enum.buttonType.edit:
                    title = 'Edit';
                    cssClass = 'edit';
                    icon = 'edit';
                    button.ngClick = button.ngClick === undefined ? 'grid.appScope.vm.viewDialog(row.entity, ' + constants.enum.dialogMode.save + ', $event)' : button.ngClick;
                    break;
                case constants.enum.buttonType.delete:
                    title = 'Delete';
                    cssClass = 'delete';
                    icon = 'delete';
                    button.ngClick = button.ngClick === undefined ? 'grid.appScope.vm.viewDialog(row.entity, ' + constants.enum.dialogMode.delete + ', $event)' : button.ngClick;
                    break;
            }
            buttonDef.cellTemplate += '<nt-button class="md-raised" title="' + title + '" ng-click="' + button.ngClick + '" ';
            if (button.claimModule !== undefined && button.claim !== undefined) {
                buttonDef.cellTemplate += 'module="' + button.claimModule + '" claim="' + button.claim + '" ';
            }
            buttonDef.cellTemplate += ' button-icon="' + icon + '" css-class="' + cssClass + '"></nt-button>'
        });

        if (hide !== undefined) {
            buttonDef.cellTemplate = '<span ng-hide="' + hide + '">' + buttonDef.cellTemplate + '</span>';
        }

        return buttonDef;

    }

}