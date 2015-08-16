'use strict';
angular.module('emine').controller('materialmovement', materialmovement)
materialmovement.$inject = ['$scope', '$window', '$filter', '$mdDialog', 'quarryService', 'uiGridConstants', 'utility', 'constants'];

function materialmovement($scope, $window, $filter, $mdDialog, quarryService, uiGridConstants, utility, constants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'materialMovementId', field: 'materialMovementId', displayName: '', enableColumnMenu: false, type: 'string', cellTemplate: "<md-checkbox ng-model=\"row.entity.Selected\" aria-label=\"{{row.entity.MaterialMovementId}}\" class=\"md-primary\"></md-checkbox>", cellClass: "text-center", enableHiding: false },
                    { name: 'productType', field: 'productType', displayName: 'Product Type', type: 'string', enableHiding: false },
                    { name: 'colour', field: 'materialColour', type: 'string', displayName: 'Colour', enableHiding: false },
                    { name: 'dimensions', field: 'dimensions', type: 'string', displayName: 'Dimensions', enableHiding: false },
                    { name: 'materialDate', field: 'materialDate', displayName: 'Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'quarry', field: 'quarry', type: 'string', displayName: 'Quarry', enableHiding: false }
        ]
    };


    var vm = {
        yards: [],
        fromYardId: undefined,
        toYardId: undefined,
        currentYardId: undefined,
        movementDate: undefined,
        gridOptions: gridOptions,
        gridHeight: '0px',
        getStock: getStock,
        moveMaterial: moveMaterial,
        movementErrorMessages: [],
        validateToYard: validateToYard
    };

    init();

    return vm;

    function init() {
        vm.yards = quarryService.yards;
        quarryService.stock.splice(0, quarryService.stock.length);
        vm.gridOptions.data = quarryService.stock;
        resizeGrid();

        angular.element($window).bind('resize', function () {
            resizeGrid();
        });
        $scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }

    function resizeGrid() {
        vm.gridHeight = utility.getMainGridHeight('main-grid');
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
            vm.movementErrorMessages.push({ type: 'dupyard', text: 'From and To yards can\'t be same' });

            form.toYard.$setValidity('dupyard', false);
        }

        if (form.$valid) {
            var selectedIds = [];
            angular.forEach(quarryService.stock, function (item) {
                if (item.Selected === true) {
                    selectedIds.push(item.materialMovementId)
                }
            });

            if (selectedIds.length === 0) {
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('No Materials Selected')
                    .content('Please select materials to move')
                    .ariaLabel('No Materials Selected')
                    .ok('Ok')
                    .targetEvent(ev)
                );
            }
            else {
                quarryService.moveMaterial({ materialMovementIds: selectedIds, fromYardId: vm.currentYardId, toYardId: vm.toYardId, movementDate: vm.movementDate })
            }
        }
    }
}

