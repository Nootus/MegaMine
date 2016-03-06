'use strict';
angular.module('megamine').controller('dressing', dressing)
dressing.$inject = ['$scope', '$mdDialog', 'uiGridConstants', 'uiGridValidateService', 'plantService', 'gridUtility', 'constants', 'message'];

function dressing($scope, $mdDialog, uiGridConstants, uiGridValidateService, plantService, gridUtility, constants, message) {
    var blockGridOptions = {
        columnDefs: [
                    { name: 'blockNumber', field: 'blockNumber', type: 'string', displayName: 'Block Number', validators: { required: true }, cellTemplate: 'ui-grid/cellTitleValidator' },
                    { name: 'lengthBefore', field: 'lengthBefore', type: 'number', displayName: 'Length(Before)', validators: { required: true, number: true }, cellTemplate: 'ui-grid/cellTitleValidator' },
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

    var operatorGridOptions = {
        columnDefs: [
                    { name: 'operatorId', field: 'operatorId', type: 'string', displayName: 'Operator' },
                    { name: 'startTime', field: 'startTime', type: 'time', displayName: 'Start Time' },
                    { name: 'endTime', field: 'endTime', type: 'time', displayName: 'End Time' },
                ]
        };


    var vm = {
        dressingModel: {},
        blockGridOptions: blockGridOptions,
        stoppageGridOptions: stoppageGridOptions,
        operatorGridOptions: operatorGridOptions,
        saveDressing: saveDressing,
        addBlocks: addBlocks,
        removeBlocks: removeBlocks,
        addStoppage: addStoppage,
        removeStoppage: removeStoppage,
        addOperator: addOperator,
        removeOperator: removeOperator,
        blankBlockRow: undefined,
        blankStoppageRow: undefined,
        blankOperatorRow: undefined
    }
    init();

    return vm;

    function init() {
        setValidators();

        vm.dressingModel = plantService.dressingModel;
        removeZeros();

        vm.blankBlockRow = angular.copy(vm.dressingModel.model.blocks[0]);
        vm.blankStoppageRow = { startTime: undefined, endTime: undefined, reason: undefined };
        vm.blankOperatorRow = { operator: undefined, startTime: undefined, endTime: undefined };

        //grid options
        setGridOptions(vm.blockGridOptions, vm.dressingModel.model.blocks);
        setGridOptions(vm.stoppageGridOptions, vm.dressingModel.machineStoppages);
        setGridOptions(vm.operatorGridOptions, vm.dressingModel.machineOperators);


    }

    function setValidators() {
        uiGridValidateService.setValidator('number',
          function (argument) {
              return function (oldValue, newValue, rowEntity, colDef) {
                  return isFinite(newValue);
              };
          },
          function (argument) {
              return 'Must be a number';
          }
        );
    }

    function removeZeros(){
        angular.forEach(vm.dressingModel.model.blocks, function (item) {
            item.lengthBefore = null;
            item.widthBefore = null;
            item.heightBefore = null;
            item.length = null;
            item.width = null;
            item.height = null;
        })
    }

    function setGridOptions(gridOptions, data) {
        gridOptions.enableColumnResizing = true,
        gridOptions.data = data;
        gridOptions.enableCellEditOnFocus = true;
        gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER,

        gridOptions.onRegisterApi = function(gridApi){
            gridOptions.gridApi = gridApi;
            //vm.blockGridOptions.gridApi.validate.on.validationFailed($scope, function (rowEntity, colDef, newValue, oldValue) {
            //    alert('rowEntity: ' + rowEntity + '\n' +
            //                  'colDef: ' + colDef + '\n' +
            //                  'newValue: ' + newValue + '\n' +
            //                  'oldValue: ' + oldValue);
            //});
        };

    }

    function saveDressing() {
        //alert(vm.blockGridOptions.gridApi.validate.isInvalid(vm.blockGridOptions.data[0], vm.blockGridOptions.columnDefs[0]));
        var gridOptions = vm.blockGridOptions;

        //idOptions.gridApi.grid.validate.runValidators(gridOptions.data[0], gridOptions.columnDefs[0], gridOptions.data[0]["blockNumber"], undefined, gridOptions.gridApi.grid)

        angular.forEach(gridOptions.data, function (rowEntity) {
            angular.forEach(gridOptions.columnDefs, function (colDef) {
                gridOptions.gridApi.grid.validate.runValidators(rowEntity, colDef, rowEntity[colDef.field], undefined, gridOptions.gridApi.grid)
            })
        })
    }

    function addBlocks() {
        add(vm.dressingModel.model.blocks, vm.blankBlockRow);
    }

    function removeBlocks() {
        remove(vm.dressingModel.model.blocks, vm.blockGridOptions.gridApi);
    }

    function addStoppage() {
        add(vm.dressingModel.machineStoppages, vm.blankStoppageRow);
    }

    function removeStoppage() {
        remove(vm.dressingModel.machineStoppages, vm.stoppageGridOptions.gridApi);
    }

    function addOperator() {
        add(vm.dressingModel.machineOperators, vm.blankOperatorRow);
    }

    function removeOperator() {
        remove(vm.dressingModel.machineOperators, vm.operatorGridOptions.gridApi);
    }

    function add(data, blankRow) {
        data.push(angular.copy(blankRow));
    }

    function remove(data, gridApi){
        var selectedRows = gridApi.selection.getSelectedRows();
        for (var selectedCounter = 0; selectedCounter < selectedRows.length; selectedCounter++) {
            for (var dataCounter = 0; dataCounter < data.length; dataCounter ++) {
                if (selectedRows[selectedCounter].$$hashKey === data[dataCounter].$$hashKey) {
                    data.splice(dataCounter, 1);
                    break;
                }
            }
        }
    }
}