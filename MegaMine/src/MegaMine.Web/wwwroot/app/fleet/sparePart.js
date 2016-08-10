'use strict';
angular.module('megamine').controller('sparePart', sparePart)
sparePart.$inject = ['$scope', 'vehicleService', 'sparePartDialog', "MegaMine.Shared.GridUtility", "MegaMine.Shared.Constants", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Template"];

function sparePart($scope, vehicleService, sparePartDialog, gridUtility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'orderedUTCdatetime', field: 'orderedUTCdatetime', displayName: 'Ordered Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'orderedUnits', field: 'orderedUnits', displayName: 'Quantity', type: 'number' },
                    { name: 'consumedUnits', field: 'consumedUnits', displayName: 'ConsumedUnits', type: 'number' },
                    { name: 'unitCost', field: 'unitCost', displayName: 'Unit Cost', type: 'number' },
                    template.getButtonDefaultColumnDefs('sparePartOrderId', 'Fleet:SparePartOrderEdit')
                    ]
        };

    var vm = {
        model: {},
        gridOptions: gridOptions,
        editSparePart: editSparePart,

        addOrder: addOrder,
        viewDialog: viewDialog
    };

    init();

    return vm;

    function init() {
        vm.model = vehicleService.sparePart;
        gridUtility.initializeSubGrid(vm.gridOptions, $scope, vehicleService.ordersList);
    }

    function editSparePart(ev) {
        sparePartDialog.viewDialog(vm.model, constants.enum.dialogMode.save, ev);
    }

    function addOrder(ev)
    {
        var model = { sparePartOrderId: 0, sparePartId: vm.model.sparePartId }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'spare_part_order_dialog',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            vehicleService.saveSparePartOrder(dialogModel).then(function () {
                //update the grid values
                if (dialogModel.sparePartOrderId === 0) {
                    vehicleService.getSparePart(dialogModel.sparePartId);
                }
                else {
                    model.orderedUTCdatetime = dialogModel.orderedUTCdatetime;
                    model.orderedUnits = dialogModel.orderedUnits;
                    model.unitCost = dialogModel.unitCost;
                }

                dialogService.hide();
            });
        });
    }
}
