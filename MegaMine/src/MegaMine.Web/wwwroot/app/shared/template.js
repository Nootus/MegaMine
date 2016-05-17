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

    function getButtonDefaultColumnDefs(field, editClaim, deleteClaim, hide) {
        
        var buttons = [{ buttonType: constants.enum.buttonType.view }, { buttonType: constants.enum.buttonType.edit, claim: editClaim }];
        if (deleteClaim !== undefined) {
            buttons.push({ buttonType: constants.enum.buttonType.delete, claim: deleteClaim });
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

        var toolTip;
        var iconCss;

        angular.forEach(buttons, function (button) {
            switch (button.buttonType) {
                case constants.enum.buttonType.view:
                    toolTip = 'View';
                    iconCss = 'eye';
                    button.ngClick = button.ngClick === undefined ? 'grid.appScope.grid.view(row.entity, ' + constants.enum.dialogMode.view + ', $event)' : button.ngClick;
                    break;
                case constants.enum.buttonType.edit:
                    toolTip = 'Edit';
                    iconCss = 'pencil-square-o';
                    button.ngClick = button.ngClick === undefined ? 'grid.appScope.grid.view(row.entity, ' + constants.enum.dialogMode.save + ', $event)' : button.ngClick;
                    break;
                case constants.enum.buttonType.delete:
                    toolTip = 'Delete';
                    iconCss = 'trash';
                    button.ngClick = button.ngClick === undefined ? 'grid.appScope.grid.view(row.entity, ' + constants.enum.dialogMode.delete + ', $event)' : button.ngClick;
                    break;
            }

            buttonDef.cellTemplate += '<nt-button type="grid" tool-tip="' + toolTip + '" icon-css="' + iconCss + '"';
            if (button.claim !== undefined) {
                buttonDef.cellTemplate += ' claim="' + button.claim + '"';
            }
            buttonDef.cellTemplate += ' ng-click="' + button.ngClick +  '"></nt-button>'
        });

        if (hide !== undefined) {
            buttonDef.cellTemplate = '<span ng-hide="' + hide + '">' + buttonDef.cellTemplate + '</span>';
        }

        return buttonDef;

    }

}