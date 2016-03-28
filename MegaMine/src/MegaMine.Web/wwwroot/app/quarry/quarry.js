'use strict';
angular.module('megamine').controller('quarry', quarry)
quarry.$inject = ['$scope', '$timeout', 'quarryService', 'quarryChart', 'gridUtility', 'utility', 'constants', 'dialogService', 'template'];

function quarry($scope, $timeout, quarryService, quarryChart, gridUtility, utility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'quarryName', field: 'quarryName', displayName: 'Name', type: 'string' },
                    { name: 'colour', field: 'colours', type: 'string', displayName: 'Colour' },
                    { name: 'location', field: 'location', type: 'string', displayName: 'Location' },
                    template.getButtonDefaultColumnDefs('quarryId', 'Quarry:QuarryEdit', 'Quarry:QuarryDelete')
        ]
    };


    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addQuarry: addQuarry,
        quarries: quarryService.quarries,

        chartOptions: quarryChart.pieChart.options,
        chartData: quarryChart.pieChart.data,
        chartApi: undefined,

        stackOptions: quarryChart.stackedAreaChart.options,
        stackData: quarryChart.stackedAreaChart.data,
        stackApi: undefined,

        barOptions: quarryChart.discreteBarChart.options,
        barData: quarryChart.discreteBarChart.data,
        barApi: undefined,

        refreshCharts: refreshCharts,
        refresh: refresh
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeGrid(vm.gridOptions, $scope, quarryService.quarries);


        $scope.gridsterOptions = {
            margins: [5, 5],
            columns: 4,
            mobileModeEnabled: false,
            draggable: {
                handle: 'h3'
            },
            resizable: {
                enabled: true,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],

                // optional callback fired when resize is started
                start: function (event, $element, widget) { },

                // optional callback fired when item is resized,
                resize: function (event, $element, widget) {
                    if (widget.chart.api) widget.chart.api.update();
                },

                // optional callback fired when item is finished resizing 
                stop: function (event, $element, widget) {
                    $timeout(function () {
                        if (widget.chart.api) widget.chart.api.update();
                    }, 400)
                }
            },
        };

        $scope.dashboard = {
            widgets: [{
                col: 0,
                row: 0,
                sizeY: 1,
                sizeX: 1,
                name: "Discrete Bar Chart",
                chart: {
                    options: quarryChart.discreteBarChart.options,
                    data: quarryChart.discreteBarChart.data(),
                    api: {}
                }
            }, {
                col: 1,
                row: 0,
                sizeY: 1,
                sizeX: 1,
                name: "Pie Chart",
                chart: {
                    options: quarryChart.pieChart.options,
                    data: quarryChart.pieChart.data(),
                    api: {}
                }
            }, {
                col: 2,
                row: 0,
                sizeY: 1,
                sizeX: 2,
                name: "Line Chart",
                chart: {
                    options: quarryChart.lineChart.options,
                    data: quarryChart.lineChart.data(),
                    api: {}
                }
            }, {
                col: 0,
                row: 1,
                sizeY: 2,
                sizeX: 4,
                name: "Area Chart",
                chart: {
                    options: quarryChart.stackedAreaChart.options,
                    data: quarryChart.stackedAreaChart.data(),
                    api: {}
                }
            }]
        };

        // We want to manually handle `window.resize` event in each directive.
        // So that we emulate `resize` event using $broadcast method and internally subscribe to this event in each directive
        // Define event handler
        $scope.events = {
            resize: function (e, scope) {
                $timeout(function () {
                    scope.api.update()
                }, 200)
            }
        };
        angular.element(window).on('resize', function (e) {
            $scope.$broadcast('resize');
        });

        // We want to hide the charts until the grid will be created and all widths and heights will be defined.
        // So that use `visible` property in config attribute
        $scope.config = {
            visible: false
        };
        $timeout(function () {
            $scope.config.visible = true;
        }, 200);
    }

    function refresh() {
        return quarryService.getQuarries();
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
    
    function refreshCharts() {
        vm.stackApi.refresh();
        vm.barApi.refresh();
        vm.chartApi.refresh();
    }
}


