'use strict';
angular.module('megamine').controller('yard', yard)
yard.$inject = ['quarryService', 'constants', 'dialogService', 'template'];

function yard(quarryService, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                        { name: 'yardName', field: 'yardName', displayName: 'Name', type: 'string' },
                        { name: 'location', field: 'location', type: 'string', displayName: 'Location' }
        ]
    };

    var vm = {
        dashboard: {
            header: 'Yards',
            widget: {
                allWidgets: quarryService.yards.dashboard.allWidgets,
                pageWidgets: quarryService.yards.dashboard.pageWidgets,
            },
            records: {

            },
            list: {
                options: {
                    fields: ['yardName', 'location'],
                    primaryField: 'yardId',
                    hideButtons: 'row.entity.quarryId !== null'
                },
                data: quarryService.yards.list,
                view: viewDialog
            },
            grid: {
                options: gridOptions,
                data: quarryService.yards.list,
                view: viewDialog,
                hideButtons: 'row.entity.quarryId !== null'
            },
            buttons: {
                add: {
                    text: 'New',
                    toolTip: 'New Yard',
                    claim: 'Quarry:YardAdd,Plant:YardAdd',
                    save: addYard,
                },
                edit: {
                    claim: 'Quarry:YardEdit,Plant:YardEdit'
                },
                delete: {
                    claim: 'Quarry:YardDelete,Plant:YardDelete'
                }
            }
        }
    };


    init();

    return vm;

    function init() {

    }

    function addYard(ev) {
        var model = { yardId: 0 }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'yard_dialog',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            if (dialogMode === constants.enum.buttonType.delete) {
                quarryService.deleteYard(dialogModel.yardId).then(function () {
                    quarryService.getYards();
                    dialogService.hide();
                });
            }
            else {
                quarryService.saveYard(dialogModel).then(function () {
                    //update the grid values
                    if (dialogModel.yardId === 0) {
                        quarryService.getYards();
                    }
                    else {
                        model.yardName = dialogModel.yardName
                        model.location = dialogModel.location
                    }

                    dialogService.hide();
                });
            }
        });
    }
}

