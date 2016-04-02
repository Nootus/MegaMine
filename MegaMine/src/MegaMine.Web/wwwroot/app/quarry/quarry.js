'use strict';
angular.module('megamine').controller('quarry', quarry)
quarry.$inject = ['quarryService', 'quarryChart', 'gridUtility', 'utility', 'constants', 'dialogService', 'template'];

function quarry(quarryService, quarryChart, gridUtility, utility, constants, dialogService, template) {

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
            widgets: [],
            options: {
                gridOptions: gridOptions,
                listOptions: {
                    data: quarryService.quarries,
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
        gridUtility.initializeGrid(vm.dashboard.options.gridOptions, quarryService.quarries);

        vm.dashboard.widgets = [{
            col: 0,
            row: 0,
            sizeY: 1,
            sizeX: 4,
            name: "Discrete Bar Chart",
            chart: {
                options: quarryChart.discreteBarChart.options,
                data: quarryChart.discreteBarChart.data(),
                api: {}
            }
        }, {
            col: 4,
            row: 0,
            sizeY: 2,
            sizeX: 2,
            name: "Pie Chart",
            chart: {
                options: quarryChart.pieChart.options,
                data: quarryChart.pieChart.data(),
                api: {}
            }
        }, {
            col: 0,
            row: 1,
            sizeY: 1,
            sizeX: 4,
            name: "Line Chart",
            chart: {
                options: quarryChart.lineChart.options,
                data: quarryChart.lineChart.data(),
                api: {}
            }
        }, {
            col: 0,
            row: 2,
            sizeY: 1,
            sizeX: 6,
            name: "Area Chart",
            chart: {
                options: quarryChart.stackedAreaChart.options,
                data: quarryChart.stackedAreaChart.data(),
                api: {}
            }
        }];
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


