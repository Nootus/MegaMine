'use strict';
angular.module('megamine').controller('material', material)
material.$inject = ['$scope', 'quarryService', 'quarryUtility', 'dialogUtility', 'utility', 'constants', 'template'];

function material($scope, quarryService, quarryUtility, dialogUtility, utility, constants, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'quarry', field: 'quarry', type: 'string', displayName: 'Quarry' },
                    { name: 'materialDate', field: 'materialDate', displayName: 'Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'colour', field: 'materialColour', type: 'string', displayName: 'Colour' },
                    { name: 'blockNumber', field: 'blockNumber', type: 'string', displayName: 'Block Number' },
                    { name: 'length', field: 'length', type: 'number', displayName: 'Length' },
                    { name: 'width', field: 'width', type: 'number', displayName: 'Width' },
                    { name: 'height', field: 'height', type: 'number', displayName: 'Height' },
                    { name: 'weight', field: 'weight', type: 'number', displayName: 'Weight' },
                    { name: 'productType', field: 'productType', displayName: 'Product Type', type: 'string' },
                    template.getButtonColumnDefs('materialId', [{ buttonType: constants.enum.buttonType.edit, ngClick: 'grid.appScope.grid.editRowMaterial(row.entity, $event)' }, { buttonType: constants.enum.buttonType.delete, ngClick: 'grid.appScope.grid.deleteRowMaterial(row.entity, $event)' }])
        ]
    };


    var vm = {
        grid: {
            options: gridOptions,
            data: [],
            editRowMaterial: editRowMaterial,
            deleteRowMaterial: deleteRowMaterial
        },
        model: {},
        previousModel: {},
        viewModel: {},
        addMaterial: addMaterial,
        saveMaterial: saveMaterial,
        cancelMaterial: cancelMaterial,
        updateMaterial: updateMaterial,
        editMode: false
    };

    init();

    return vm;

    function init() {
        vm.viewModel = quarryService.materialViewModel;
        vm.model = vm.viewModel.model;
        vm.model.materialDate = new Date();

        quarryUtility.addMaterialWatchers($scope, vm.model); 
    }

    function updateDropDownText() {
        vm.model.productType = utility.getItem(vm.viewModel.productType, vm.model.productTypeId, 'productTypeId', 'productTypeName');
        vm.model.materialColour = utility.getListItem(vm.viewModel.materialColour, vm.model.materialColourId);
        vm.model.quarry = utility.getListItem(vm.viewModel.quarry, vm.model.quarryId);
    }

    function resetModel() {
        vm.model.blockNumber = "";
        vm.model.length = "";
        vm.model.width = "";
        vm.model.height = "";
        vm.model.weight = "";
    }

    function addMaterial(form) {
        if (form.$valid) {
            updateDropDownText();
            vm.model.index = vm.grid.data.length;
            vm.grid.data.push(angular.copy(vm.model));
            resetModel();
        }
    }

    function saveMaterial(ev) {
        if (vm.grid.data.length === 0) {
            dialogUtility.alert('No Materials', 'Please add materials to save', ev);
        }
        else {

            dialogUtility.confirm('Confirm Save', 'Please confirm to save the material', ev)
                .then(function () {
                quarryService.saveMaterial(vm.grid.data)
                    .then(function (data) {
                            vm.grid.data.splice(0, vm.grid.data.length);
                            resetModel();
                        });
                    });
        }
    }

    function editRowMaterial(row, ev) {
        vm.previousModel = angular.copy(vm.model);
        angular.extend(vm.model, row);
        //bypassing watchers that calculate product type and weight
        vm.model.bypassWeightWatcher = true;
        vm.model.bypassProductTypeWatcher = true;
        vm.editMode = true;
    }

    function deleteRowMaterial(row, ev) {
        dialogUtility.confirm('Delete Material', 'Are you sure you want to delete the material', ev)
            .then(function () {
            vm.grid.data.splice(row.index, 1);
        });
    }

    function cancelMaterial(form) {
        angular.extend(vm.model, vm.previousModel);
        vm.editMode = false;
    }

    function updateMaterial(form) {
        if (form.$valid) {
            updateDropDownText();
            angular.extend(vm.grid.data[vm.model.index], vm.model);
            resetModel();
            vm.editMode = false;
        }
    }
}

