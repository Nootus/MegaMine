'use strict';
angular.module('megamine').controller('material', material)
material.$inject = ['$scope', 'quarryService', 'quarryUtility', 'dialogUtility', "MegaMine.Shared.Utility", "MegaMine.Shared.Constants", "MegaMine.Shared.Template"];

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
                    { name: 'texture', field: 'texture', displayName: 'Texture', type: 'string' },
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
        processTypeEnum: MegaMine.Quarry.ProcessType,
        addMaterial: addMaterial,
        saveMaterial: saveMaterial,
        cancelMaterial: cancelMaterial,
        updateMaterial: updateMaterial,
        editMode: false,
        checkRequired: checkRequired
    };

    init();

    return vm;

    function init() {
        vm.viewModel = quarryService.materialViewModel;
        vm.model = vm.viewModel.model;
        vm.model.materialDate = new Date();
        vm.model.processTypeId = vm.processTypeEnum.Cutting;

        vm.viewModel.textures.unshift({ key: "0", item: "" });

        quarryUtility.addMaterialWatchers($scope, vm.model); 
    }

    function updateDropDownText() {
        vm.model.productType = utility.getItem(vm.viewModel.productTypes, vm.model.productTypeId, 'productTypeId', 'productTypeName');
        vm.model.materialColour = utility.getListItem(vm.viewModel.materialColours, vm.model.materialColourId);
        vm.model.quarry = utility.getListItem(vm.viewModel.quarries, vm.model.quarryId);
        vm.model.texture = utility.getListItem(vm.viewModel.textures, vm.model.textureId);
    }

    function resetModel() {
        vm.model.blockNumber = undefined;
        vm.model.length = "";
        vm.model.width = "";
        vm.model.height = "";
        vm.model.weight = "";
        vm.model.productTypeId = undefined;
    }

    function addMaterial(form) {
        if (form.$valid) {
            quarryUtility.clearByProcessType(vm.model);
            updateDropDownText();
            vm.model.index = vm.grid.data.length;
            if (vm.model.textureId == "0")
                vm.model.textureId = undefined;

            vm.grid.data.push(angular.copy(vm.model));
            resetModel();
            form.$submitted = false;
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

    function checkRequired(processTypeId) {
        return vm.model.processTypeId == processTypeId;
    }
}

