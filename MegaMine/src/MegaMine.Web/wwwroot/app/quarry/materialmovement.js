'use strict';
angular.module('megamine').controller('materialMovement', materialMovement)
materialMovement.$inject = ['$scope', 'quarryService', 'gridUtility', 'dialogUtility', 'constants', 'message'];

function materialMovement($scope, quarryService, gridUtility, dialogUtility, constants, message) {

    var gridOptions = {
        columnDefs: [
                    { name: 'blockNumber', field: 'blockNumber', displayName: 'Block Number', type: 'string' },
                    { name: 'productType', field: 'productType', displayName: 'Product Type', type: 'string' },
                    { name: 'colour', field: 'materialColour', type: 'string', displayName: 'Colour' },
                    { name: 'length', field: 'length', type: 'number', displayName: 'Length' },
                    { name: 'width', field: 'width', type: 'number', displayName: 'Width' },
                    { name: 'height', field: 'height', type: 'number', displayName: 'Height' },
                    { name: 'weight', field: 'weight', type: 'number', displayName: 'Weight' },
                    { name: 'materialDate', field: 'materialDate', displayName: 'Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'quarry', field: 'quarry', type: 'string', displayName: 'Quarry' }
        ]
    };


    var vm = {
        yards: [],
        groupYards: [],
        fromYardId: undefined,
        toYardId: undefined,
        currentYardId: undefined,
        movementDate: undefined,
        gridOptions: gridOptions,
        getStock: getStock,
        moveMaterial: moveMaterial,
        movementErrorMessages: [],
        validateToYard: validateToYard
    };

    init();

    return vm;

    function init() {
        vm.yards = quarryService.yards;
        vm.groupYards = quarryService.groupYards;
        quarryService.stock.splice(0, quarryService.stock.length);

        gridUtility.initializeGrid(vm.gridOptions, $scope, quarryService.stock);
    }

    function getStock(form) {
        if (form.$valid) {
            quarryService.getStock(vm.fromYardId);
            vm.currentYardId = vm.fromYardId;
        }
    }

    function validateToYard(form) {
        if (form.toYard !== undefined && !form.toYard.$valid && vm.currentYardId !== vm.toYardId) {
            form.toYard.$setValidity('dupyard', true);
        }
    }

    function moveMaterial(form, ev) {
        form.$submitted = true;

        //checking the from & to yard
        if (vm.currentYardId === vm.toYardId) {
            vm.movementErrorMessages.splice(0, vm.movementErrorMessages.length);
            vm.movementErrorMessages.push({ type: 'dupyard', text: message.dupYard });

            form.toYard.$setValidity('dupyard', false);
        }

        if (form.$valid) {
            var selectedIds = [];
            angular.forEach(vm.gridOptions.gridApi.selection.getSelectedRows(), function (item) {
                selectedIds.push(item.materialMovementId)
            });

            if (selectedIds.length === 0) {
                dialogUtility.alert('No Materials Selected', 'Please select materials to move', ev);
            }
            else {
                quarryService.moveMaterial({ materialMovementIds: selectedIds, fromYardId: vm.currentYardId, toYardId: vm.toYardId, movementDate: vm.movementDate })
            }
        }
    }
}

