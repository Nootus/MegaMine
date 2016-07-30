'use strict';
angular.module('megamine').controller('stockyard', stockyard)
stockyard.$inject = ['$scope', 'quarryService', 'gridUtility', 'quarryUtility', "MegaMine.Shared.Constants", 'dialogService', "MegaMine.Shared.Template", "MegaMine.Shared.Message"];

function stockyard($scope, quarryService, gridUtility, quarryUtility, constants, dialogService, template, message) {

    var gridOptions = {
        columnDefs: [
                    { name: 'blockNumber', field: 'blockNumber', displayName: 'Block #', type: 'string' },
                    { name: 'productType', field: 'productType', displayName: 'Type', type: 'string' },
                    { name: 'colour', field: 'materialColour', type: 'string', displayName: 'Colour' },
                    { name: 'texture', field: 'texture', type: 'string', displayName: 'Texture' },
                    { name: 'length', field: 'length', type: 'number', displayName: 'Length' },
                    { name: 'width', field: 'width', type: 'number', displayName: 'Width' },
                    { name: 'height', field: 'height', type: 'number', displayName: 'Height' },
                    { name: 'weight', field: 'weight', type: 'number', displayName: 'Weight' },
                    { name: 'materialDate', field: 'materialDate', displayName: 'Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'quarry', field: 'quarry', type: 'string', displayName: 'Quarry' },
                    template.getButtonColumnDefs('materialMovementId', [{ buttonType: constants.enum.buttonType.edit, claim: 'Quarry:MaterialUpdate', ngClick: 'grid.appScope.grid.editStock(row.entity, $event)' }, { buttonType: constants.enum.buttonType.delete, claim: 'Quarry:MaterialDelete', ngClick: 'grid.appScope.grid.deleteStock(row.entity, $event)' }]),
        ]
    };


    var vm = {
        grid: {
            options: gridOptions,
            data: quarryService.stock,
            editStock: editStock,
            deleteStock: deleteStock
        },
        processTypeEnum: MegaMine.Quarry.ProcessType,
        yards: [],
        yardid: 0,
        getStock: getStock,
        noStockMessage: undefined,
        productTypes: []
    };

    init();

    return vm;

    function init() {
        quarryService.materialViewModel = {}; //resetting the view model, so that it can be populated in the edit pop ups
        vm.yards = quarryService.yardList;
        quarryService.stock.splice(0, quarryService.stock.length);
    }

    function getStock(form) {
        if (form.$valid) {
            vm.noStockMessage = undefined;
            quarryService.getStock(vm.yardId).then(function () {
                if (quarryService.stock.length === 0)
                    vm.noStockMessage = message.noStockMessage;
            });
        }
    }

    function editStock(model, ev) {
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function deleteStock(model, ev) {
        viewDialog(model, constants.enum.dialogMode.delete, ev);
    }

    function dialogInit(dialogScope, dialogModel) {
        //making a backup copy of product types. this is need as we apply filters
        if (vm.productTypes.length === 0) {
            angular.copy(quarryService.materialViewModel.productTypes, vm.productTypes);
        }
        else {
            quarryService.materialViewModel.productTypes = angular.copy(vm.productTypes);
        }
        quarryUtility.addMaterialWatchers(dialogScope, dialogModel);
    }

    function viewDialog(model, dialogMode, ev) {
        model.currentYardId = vm.yardId;
        dialogService.show({
            templateUrl: 'stockyard_dialog',
            targetEvent: ev,
            data: { model: model, viewModel: quarryService.materialViewModel },
            dialogMode: dialogMode,
            dialogInit: dialogInit,
            resolve: {
                resolveModel: function () {
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
                quarryService.materialDelete(dialogModel.materialId, model.currentYardId).then(function () {
                    dialogService.hide();
                });
            }
            else {
                quarryUtility.clearByProcessType(dialogModel);
                quarryService.materialUpdate(dialogModel).then(function () {
                    dialogService.hide();
                });
            }
        });
    }

}

