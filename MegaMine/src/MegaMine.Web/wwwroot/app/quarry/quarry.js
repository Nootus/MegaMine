'use strict';
angular.module('megamine').controller('quarry', quarry)
quarry.$inject = ['quarryService', 'quarryChart', 'gridUtility', 'widgetUtility', 'utility', 'constants', 'dialogService', 'template'];

function quarry(quarryService, quarryChart, gridUtility, widgetUtility, utility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'quarryName', field: 'quarryName', displayName: 'Name', type: 'string' },
                    { name: 'colour', field: 'colours', type: 'string', displayName: 'Colour' },
                    { name: 'location', field: 'location', type: 'string', displayName: 'Location' },
                    template.getButtonDefaultColumnDefs('quarryId', 'Quarry:QuarryEdit', 'Quarry:QuarryDelete')
        ]
    };


    var vm = {
        dashboard: {
            header: 'Quarries',
            options: {
                gridOptions: gridOptions,
                listOptions: {
                    data: quarryService.quarries.list,
                    fields: ['quarryName', 'colours', 'location'],
                    primaryField: 'quarryId'
                },
                addOptions: {
                    text: 'New',
                    toolTip: 'New Quarry',
                    claim: 'Quarry:QuarryAdd',
                    add: addQuarry,
                    view: viewDialog
                }
            }
        }
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeGrid(vm.dashboard.options.gridOptions, quarryService.quarries.list);
        widgetUtility.initialize(vm.dashboard, quarryService.quarries.dashboard);

        //vm.dashboard.widgets[0].chart.data = quarryChart.lineChart.data();
        //vm.dashboard.widgets[1].chart.data = quarryChart.pieChart.data();
        //vm.dashboard.widgets[2].chart.data = quarryChart.multiBarChart.data();
        vm.dashboard.widgets[3].chart.data = quarryChart.stackedAreaChart.data();
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
                        model.colours = utility.getItem(quarryService.colours, dialogModel.colourIds[0], "materialColourId", "colourName");
                    }

                    dialogService.hide();
                });
            }
        });
    }
}


