'use strict';
angular.module('emine').controller('materialmovement', materialmovement)
materialmovement.$inject = ['$scope', '$window', '$filter', '$mdDialog', 'quarryService', 'uiGridConstants', 'utility', 'constants'];

function materialmovement($scope, $window, $filter, $mdDialog, quarryService, uiGridConstants, utility, constants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'materialMovementId', field: 'MaterialMovementId', displayName: '', enableColumnMenu: false, type: 'string', cellTemplate: "<md-checkbox ng-model=\"row.entity.Selected\" aria-label=\"{{row.entity.MaterialMovementId}}\" class=\"md-primary\"></md-checkbox>", cellClass: "text-center", enableHiding: false },
                    { name: 'productType', field: 'ProductType', displayName: 'Product Type', type: 'string', enableHiding: false },
                    { name: 'colour', field: 'MaterialColour', type: 'string', displayName: 'Colour', enableHiding: false },
                    { name: 'dimensions', field: 'Dimensions', type: 'string', displayName: 'Dimensions', enableHiding: false },
                    { name: 'materialDate', field: 'MaterialDate', displayName: 'Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'quarry', field: 'Quarry', type: 'string', displayName: 'Quarry', enableHiding: false }
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
                    selectedIds.push(item.MaterialMovementId)
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
                quarryService.moveMaterial({ MaterialMovementIds: selectedIds, FromYardId: vm.currentYardId, ToYardId: vm.toYardId, MovementDate: vm.movementDate })
            }
        }
    }
}

