'use strict';
angular.module('emine').controller('stockyard', stockyard)
stockyard.$inject = ['$scope', '$mdDialog', 'quarryService', 'gridUtility', 'constants', 'dialogService', 'template'];

function stockyard($scope, $mdDialog, quarryService, gridUtility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'productType', field: 'productType', displayName: 'Product Type', type: 'string', enableHiding: false },
                    { name: 'colour', field: 'materialColour', type: 'string', displayName: 'Colour', enableHiding: false },
                    { name: 'length', field: 'length', type: 'number', displayName: 'Length', enableHiding: false },
                    { name: 'width', field: 'width', type: 'number', displayName: 'Width', enableHiding: false },
                    { name: 'height', field: 'height', type: 'number', displayName: 'Height', enableHiding: false },
                    { name: 'weight', field: 'weight', type: 'number', displayName: 'Weight', enableHiding: false },
                    { name: 'materialDate', field: 'materialDate', displayName: 'Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'quarry', field: 'quarry', type: 'string', displayName: 'Quarry', enableHiding: false },
                    template.getButtonColumnDefs('materialMovementId', [{ buttonType: constants.enum.buttonType.edit, claimModule: 'Quarry', claim: 'MaterialUpdate', ngClick: 'grid.appScope.vm.editStock(row.entity, $event)' }, { buttonType: constants.enum.buttonType.delete, claimModule: 'Quarry', claim: 'MaterialUpdate', ngClick: 'grid.appScope.vm.deleteStock(row.entity, $event)' }]),
        ]
    };


    var vm = {
        yards: [],
        yardid: 0,
        gridOptions: gridOptions,
        editStock: editStock,
        deleteStock: deleteStock,
        getStock: getStock,
    };

    init();

    return vm;

    function init() {
        quarryService.materialViewModel = {}; //resetting the view model, so that it can be populated in the edit pop ups
        vm.yards = quarryService.yards;
        quarryService.stock.splice(0, quarryService.stock.length);

        gridUtility.initializeGrid(vm, $scope, quarryService.stock);
    }

    function getStock(form) {
        if (form.$valid) {
            quarryService.getStock(vm.yardId);
        }
    }

    function editStock(model, ev) {
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function deleteStock(model, ev) {
        viewDialog(model, constants.enum.dialogMode.delete, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        model.currentYardId = vm.yardId;
        dialogService.show({
            templateUrl: 'stockyard_dialog',
            targetEvent: ev,
            data: { model: model, viewModel: quarryService.materialViewModel },
            dialogMode: dialogMode,
            resolve: {
                function () {
                    if (Object.getOwnPropertyNames(quarryService.materialViewModel).length === 0) {
                        return quarryService.getMaterialViewModel()
                    }
                    else {
                        return true;
                    }
                }
            }
        })
        .then(function (dialogModel) {
            if (dialogMode === constants.enum.dialogMode.delete) {
                alert('delete functionality yet to be implemented');
                dialogService.hide();
            }
            else {
                quarryService.materialUpdate(dialogModel).then(function () {
                    dialogService.hide();
                });
            }
        });
    }

}

