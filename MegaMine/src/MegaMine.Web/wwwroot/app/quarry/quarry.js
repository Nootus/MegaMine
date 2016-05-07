'use strict';
angular.module('megamine').controller('quarry', quarry)
quarry.$inject = ['quarryService', 'utility', 'constants', 'dialogService', 'template'];

function quarry(quarryService, utility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'quarryName', field: 'quarryName', displayName: 'Name', type: 'string' },
                    { name: 'colour', field: 'colours', type: 'string', displayName: 'Colour' },
                    { name: 'location', field: 'location', type: 'string', displayName: 'Location' }
        ]
    };


    var vm = {
        dashboard: {
            header: 'Quarries',
            widgets: {
                allWidgets: quarryService.quarries.dashboard.allWidgets,
                pageWidgets: quarryService.quarries.dashboard.pageWidgets,
            },
            records: {
                options: {
                    primaryField: 'quarryId',
                    data: quarryService.quarries.list,
                    view: viewDialog
                },
                list: {
                    options: {
                        fields: ['quarryName', 'colours', 'location'],
                    },
                },
                grid: {
                    options: gridOptions
                },
                buttons: {
                    options: {
                        hideButtons: undefined
                    },
                    add: {
                        text: 'New',
                        toolTip: 'New Quarry',
                        claim: 'Quarry:QuarryAdd',
                        save: addQuarry,
                    },
                    edit: {
                        claim: 'Quarry:QuarryEdit'
                    },
                    delete: {
                        claim: 'Quarry:QuarryDelete'
                    }
                }
           }
        }
    };

    init();

    return vm;

    function init() {

    }

    function addQuarry(ev) {
        var model = { quarryId: 0, colourIds: [] }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'quarry_dialog',
            targetEvent: ev,
            data: { model: model, service: quarryService },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            if (dialogMode === constants.enum.buttonType.delete) {
                quarryService.deleteQuarry(dialogModel.quarryId).then(function () {
                    quarryService.getQuarries();
                    dialogService.hide();
                });
            }
            else {
                quarryService.saveQuarry(dialogModel).then(function () {
                    //update the grid values
                    if (dialogModel.quarryId === 0) {
                        quarryService.getQuarries();
                    }
                    else {
                        model.quarryName = dialogModel.quarryName
                        model.location = dialogModel.location
                        angular.extend(model.colourIds, dialogModel.colourIds)
                        model.colours = utility.getListItem(quarryService.colourListItems, dialogModel.colourIds[0]);
                    }

                    dialogService.hide();
                });
            }
        });
    }
}


