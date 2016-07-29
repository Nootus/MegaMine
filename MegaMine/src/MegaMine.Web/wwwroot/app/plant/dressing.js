'use strict';
angular.module('megamine').controller('dressing', dressing)
dressing.$inject = ['$scope', 'uiGridConstants', 'uiGridValidateService', 'moment', 'plantService', 'dialogUtility', "MegaMine.Shared.Utility", 'message'];

function dressing($scope, uiGridConstants, uiGridValidateService, moment, plantService, dialogUtility, utility, message) {
    var blockGridOptions = {
        columnDefs: [
                    { name: 'blockNumber', field: 'blockNumber', type: 'string', displayName: 'Block Number', validators: { required: true }, cellTemplate: 'ui-grid/cellTitleValidator' },
                    { name: 'lengthBefore', field: 'lengthBefore', type: 'number', displayName: 'Length(Before)', validators: { required: true, number: true }, cellTemplate: 'ui-grid/cellTitleValidator' },
                    { name: 'widthBefore', field: 'widthBefore', type: 'number', displayName: 'Width(Before)', validators: { required: true, number: true }, cellTemplate: 'ui-grid/cellTitleValidator' },
                    { name: 'heightBefore', field: 'heightBefore', type: 'number', displayName: 'Height(Before)', validators: { required: true, number: true }, cellTemplate: 'ui-grid/cellTitleValidator' },
                    { name: 'weightBefore', field: 'weightBefore', type: 'number', displayName: 'Weight(Before)', validators: { number: true }, cellTemplate: 'ui-grid/cellTitleValidator' },
                    { name: 'length', field: 'length', type: 'number', displayName: 'Length', validators: { required: true, number: true }, cellTemplate: 'ui-grid/cellTitleValidator' },
                    { name: 'width', field: 'width', type: 'number', displayName: 'Width', validators: { required: true, number: true }, cellTemplate: 'ui-grid/cellTitleValidator' },
                    { name: 'height', field: 'height', type: 'number', displayName: 'Height', validators: { required: true, number: true }, cellTemplate: 'ui-grid/cellTitleValidator' },
                    { name: 'weight', field: 'weight', type: 'number', displayName: 'Weight', validators: { number: true }, cellTemplate: 'ui-grid/cellTitleValidator' },
        ]
    };

    var stoppageGridOptions = {
        columnDefs: [
                    { name: 'startTime', field: 'startTime', type: 'time', displayName: 'Start Time', validators: { required: true, time: true, timeRange: true }, cellTemplate: 'ui-grid/cellTitleValidator', gridOptions: 'stoppageGridOptions' },
                    { name: 'endTime', field: 'endTime', type: 'time', displayName: 'End Time', validators: { required: true, time: true, timeRange: true }, cellTemplate: 'ui-grid/cellTitleValidator', gridOptions: 'stoppageGridOptions' },
                    { name: 'reason', field: 'reason', type: 'string', displayName: 'Reason', validators: { required: true }, cellTemplate: 'ui-grid/cellTitleValidator' },
        ]
    };

    var operatorGridOptions = {
        columnDefs: [
                    { name: 'operatorName', field: 'operatorName', type: 'string', displayName: 'Operator', validators: { required: true }, cellTemplate: 'ui-grid/cellTitleValidator', editableCellTemplate: 'ui-grid/dropdownEditor', editDropdownOptionsArray: plantService.dressingModel.operators, editDropdownValueLabel: 'item', editDropdownIdLabel: 'key', editModelField: 'operatorId' },
                    { name: 'startTime', field: 'startTime', type: 'time', displayName: 'Start Time', validators: { required: true, time: true, timeRange: true }, cellTemplate: 'ui-grid/cellTitleValidator', gridOptions: 'operatorGridOptions' },
                    { name: 'endTime', field: 'endTime', type: 'time', displayName: 'End Time', validators: { required: true, time: true, timeRange: true }, cellTemplate: 'ui-grid/cellTitleValidator', gridOptions: 'operatorGridOptions' },
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
        blankOperatorRow: undefined,
        gridsValid: true,
        validationErrors: { message: undefined, errors: []}
    }
    init();

    return vm;

    function init() {
        setValidators();

        vm.dressingModel = plantService.dressingModel;
        removeBlockModelZeros();

        vm.blankBlockRow = angular.copy(vm.dressingModel.model.blocks[0]);
        vm.blankStoppageRow = { startTime: null, endTime: null, reason: null };
        vm.blankOperatorRow = { operatorId: null, opeartorName: null, startTime: null, endTime: null };

        //grid options
        setGridOptions(vm.blockGridOptions, vm.dressingModel.model.blocks);
        setGridOptions(vm.stoppageGridOptions, vm.dressingModel.machineStoppages);
        setGridOptions(vm.operatorGridOptions, vm.dressingModel.machineOperators);

        //operator Grid showing operator name
    }

    function setValidators() {
        uiGridValidateService.setValidator('number',
          function (argument) {
              return function (oldValue, newValue, rowEntity, colDef) {
                  if (argument) {
                      return isFinite(newValue);
                  }
                  return true;
              };
          },
          function (argument) {
              return message.numberInvalid;
          }
        );
        uiGridValidateService.setValidator('time',
          function (argument) {
              return function (oldValue, newValue, rowEntity, colDef) {
                  if (argument && newValue) {
                      return moment(newValue, 'h:mm A', true).isValid();
                  }
                  return true;
              };
          },
          function (argument) {
              return message.timeInvalid;
          }
        );
        uiGridValidateService.setValidator('timeRange',
          function (argument) {
              return function (oldValue, newValue, rowEntity, colDef) {
                  if (argument && rowEntity.startTime && rowEntity.endTime) {
                      var startTime = moment(rowEntity.startTime, 'h:mm A', true);
                      var endTime = moment(rowEntity.endTime, 'h:mm A', true);
                      if (startTime.isValid() && endTime.isValid()){
                          var result = startTime.isBefore(endTime);
                          if (result) {
                              var gridOptions = vm[colDef.gridOptions];
                              var columnDefs = gridOptions.columnDefs;
                              //clearing the error for start or end time set earlier
                              for (var counter = 0; counter < columnDefs.length; counter++) {
                                  uiGridValidateService.clearError(rowEntity, columnDefs[counter], 'timeRange');
                                  //ToDo: workaround for bug in UI grid
                                  if (rowEntity['$$errors' + columnDefs[counter].name] !== undefined && Object.getOwnPropertyNames(rowEntity['$$errors' + columnDefs[counter].name]).length === 0) {
                                      delete rowEntity['$$invalid' + columnDefs[counter].name];
                                  }
                              }
                          }
                          return result;
                      }
                      else
                          return true;
                  }
                  return true;
              };
          },
          function (argument) {
              return message.timeRangeInvalid;
          }
        );
    }

    function removeBlockModelZeros(){
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
            gridApi.validate.on.validationFailed($scope, function (rowEntity, colDef, newValue, oldValue) {
                vm.gridsValid = false;
            });

            gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                if (colDef.field === 'operatorName') {
                    rowEntity.operatorName = utility.getItem(vm.dressingModel.operators, rowEntity.operatorId, "key", "item");;
                }
            });
        };

    }

    function saveDressing(form, ev) {
        vm.gridsValid = true;
        validateGrid(vm.blockGridOptions);
        validateGrid(vm.stoppageGridOptions);
        validateGrid(vm.operatorGridOptions);

        vm.validationErrors.message = undefined;
        var errors = vm.validationErrors.errors;
        errors.splice(0, errors.length);

        dialogUtility.confirm('Confirm Save', 'Please confirm to save the Dressing info', ev )
            .then(function () {
                //validating form
                if (vm.dressingModel.model.blocks.length === 0) {
                    errors.push({ description: message.BlockRequired });
                    vm.gridsValid = false;
                }
                if (vm.dressingModel.machineStoppages.length === 0) {
                    //TODO: Check whether this validation is required
                    //errors.push({ description: 'There should be at least one stoppage' });
                    //vm.gridsValid = false;
                }
                else if (!validateTimeOverlap(vm.dressingModel.machineStoppages)) {
                    errors.push({ description: message.StoppageTimeOverlapInvalid });
                    vm.gridsValid = false;
                }

                if (vm.dressingModel.machineOperators.length === 0) {
                    errors.push({ description: message.OperatorRequired });
                    vm.gridsValid = false;
                }
                else if (!validateTimeOverlap(vm.dressingModel.machineOperators)) {
                    errors.push({ description: message.OperatorTimeOverlapInvalid });
                    vm.gridsValid = false;
                }

                if (!form.$valid || !vm.gridsValid) {
                    vm.validationErrors.message = message.confirmError;
                }
                else {
                    //saving the model
                    plantService.dressingSave(vm.dressingModel).then(function(data){

                    }).catch(function (data) {
                        vm.validationErrors.message = data.message;
                        utility.extend(vm.validationErrors.errors, data.model.data);
                    })
                }
        });

    }

    function validateTimeOverlap(data) {
        for (var counter = 0; counter < data.length; counter++) {
            var startTime = moment(data[counter].startTime, 'h:mm A', true);
            var endTime = moment(data[counter].endTime, 'h:mm A', true);
            for (var subCounter = counter + 1; subCounter < data.length; subCounter++) {
                var subStartTime = moment(data[subCounter].startTime, 'h:mm A', true);
                var subEndTime = moment(data[subCounter].endTime, 'h:mm A', true);
                if (startTime.isBetween(subStartTime, subEndTime) || endTime.isBetween(subStartTime, subEndTime) || (startTime.isSameOrBefore(subStartTime) && endTime.isSameOrAfter(subEndTime))) {
                    return false;
                }
            }
        }

        return true;
    }

    function validateGrid(gridOptions) {
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