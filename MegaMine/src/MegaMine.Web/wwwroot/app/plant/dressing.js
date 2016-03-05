'use strict';
angular.module('megamine').controller('dressing', dressing)
dressing.$inject = ['$scope', '$mdDialog', 'uiGridConstants', 'plantService', 'gridUtility', 'constants', 'message'];

function dressing($scope, $mdDialog, uiGridConstants, plantService, gridUtility, constants, message) {
    var dressingGridOptions = {
        columnDefs: [
                    { name: 'blockNumber', field: 'blockNumber', type: 'string', displayName: 'Block Number' },
                    { name: 'lengthBefore', field: 'lengthBefore', type: 'number', displayName: 'Length(Before)' },
                    { name: 'widthBefore', field: 'widthBefore', type: 'number', displayName: 'Width(Before)' },
                    { name: 'heightBefore', field: 'heightBefore', type: 'number', displayName: 'Height(Before)' },
                    { name: 'weightBefore', field: 'weightBefore', type: 'number', displayName: 'Weight(Before)' },
                    { name: 'length', field: 'length', type: 'number', displayName: 'Length' },
                    { name: 'width', field: 'width', type: 'number', displayName: 'Width' },
                    { name: 'height', field: 'height', type: 'number', displayName: 'Height' },
                    { name: 'weight', field: 'weight', type: 'number', displayName: 'Weight' },
        ]
    };

    var stoppageGridOptions = {
        columnDefs: [
                    { name: 'startTime', field: 'startTime', type: 'time', displayName: 'Start Time' },
                    { name: 'endTime', field: 'endTime', type: 'time', displayName: 'End Time' },
                    { name: 'reason', field: 'reason', type: 'string', displayName: 'Reason' },
        ]
    };

    var vm = {
        dressingModel: {},
        dressingGridOptions: dressingGridOptions,
        stoppageGridOptions: stoppageGridOptions,
        saveDressing: saveDressing,
        addBlocks: addBlocks,
        blankBlockRow: {},
        blankStoppageRow: {}
    }
    init();

    return vm;

    function init() {
        vm.dressingModel = plantService.dressingModel;

        vm.blankBlockRow = angular.copy(vm.dressingModel.model.blocks[0]);
        vm.blankStoppageRow = angular.copy(vm.dressingModel.machineStoppages[0]);

        //grid options
        setGridOptions(vm.dressingGridOptions, vm.dressingModel.model.blocks);
        setGridOptions(vm.stoppageGridOptions, vm.dressingModel.machineStoppages);
    }

    function setGridOptions(gridOptions, data) {
        gridOptions.enableColumnResizing = true,
        gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER,
        gridOptions.data = data;
        gridOptions.enableCellEditOnFocus = true;
    }

    function saveDressing() {

    }

    function addBlocks() {
        vm.dressingModel.model.blocks.push(angular.copy(vm.blankBlockRow));
    }
}