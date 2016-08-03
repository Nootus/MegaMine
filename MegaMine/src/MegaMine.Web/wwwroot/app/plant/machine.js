'use strict';
angular.module('megamine').controller('machine', machine)
machine.$inject = ['plantService', "MegaMine.Shared.Utility", "MegaMine.Shared.Constants", "MegaMine.Shared.DialogService"];

function machine(plantService, utility, constants, dialogService) {

    var gridOptions = {
        columnDefs: [
                    { name: 'name', field: 'name', displayName: 'Name', type: 'string' },
                    { name: 'bladeName', field: 'bladeName', displayName: 'Blade', type: 'string' },
                    { name: 'description', field: 'description', type: 'string', displayName: 'Description' }
        ]
    };

    var vm = {
        dashboard: {
            header: 'Machines',
            widgets: {
                allWidgets: plantService.machines.widgets.allWidgets,
                pageWidgets: plantService.machines.widgets.pageWidgets,
            },
            records: {
                options: {
                    primaryField: 'machineId',
                    data: plantService.machines.list,
                    view: viewDialog
                },
                list: {
                    options: {
                        fields: ['name', 'bladeName']
                    },
                },
                grid: {
                    options: gridOptions
                },
                buttons: {
                    add: {
                        text: 'New',
                        toolTip: 'New Machine',
                        claim: 'Plant:MachineAdd',
                        save: machineAdd,
                    },
                    edit: {
                        claim: 'Plant:MachineEdit'
                    },
                    delete: {
                        claim: 'Plant:MachineDelete'
                    }
                }
            }
        }
    };

    init();

    return vm;

    function init() {

    }

    function machineAdd(ev) {
        var model = { machineId: 0 }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'machine_dialog',
            targetEvent: ev,
            data: { model: model, service: plantService },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            if (dialogMode === constants.enum.buttonType.delete) {
                plantService.machineDelete(dialogModel.machineId).then(function () {
                    plantService.machinesGet();
                    dialogService.hide();
                });
            }
            else {
                plantService.machineSave(dialogModel).then(function () {
                    //update the grid values
                    if (dialogModel.machineId === 0) {
                        plantService.machinesGet();
                    }
                    else {
                        model.name = dialogModel.name;
                        model.description = dialogModel.description;
                        model.bladeName = utility.getItem(plantService.bladeListItems, dialogModel.bladeId, "key", "item");
                    }

                    dialogService.hide();
                });
            }
        });
    }
}

