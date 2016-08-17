var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Quarry;
    (function (Quarry) {
        let Material = class Material {
            constructor($scope, quarryService, quarryUtility, dialogUtility, utility, constants, template) {
                this.$scope = $scope;
                this.quarryService = quarryService;
                this.quarryUtility = quarryUtility;
                this.dialogUtility = dialogUtility;
                this.utility = utility;
                this.constants = constants;
                this.template = template;
                this.model = {};
                this.previousModel = {};
                this.viewModel = {};
                this.processTypeEnum = MegaMine.Quarry.Models.ProcessType;
                this.editMode = false;
                const self = this;
                const gridOptions = {
                    columnDefs: [
                        { name: "quarry", field: "quarry", type: "string", displayName: "Quarry" },
                        {
                            name: "materialDate", field: "materialDate", displayName: "Date", type: "date",
                            cellFilter: "date:\"" + constants.dateFormat + "\""
                        },
                        { name: "colour", field: "materialColour", type: "string", displayName: "Colour" },
                        { name: "blockNumber", field: "blockNumber", type: "string", displayName: "Block Number" },
                        { name: "length", field: "length", type: "number", displayName: "Length" },
                        { name: "width", field: "width", type: "number", displayName: "Width" },
                        { name: "height", field: "height", type: "number", displayName: "Height" },
                        { name: "weight", field: "weight", type: "number", displayName: "Weight" },
                        { name: "productType", field: "productType", displayName: "Product Type", type: "string" },
                        { name: "texture", field: "texture", displayName: "Texture", type: "string" },
                        template.getButtonColumnDefs("materialId", [
                            {
                                buttonType: 1 /* edit */, claim: undefined,
                                ngClick: "grid.appScope.grid.context.editRowMaterial(row.entity, $event)"
                            },
                            {
                                buttonType: constants.enum.buttonType.delete, claim: undefined,
                                ngClick: "grid.appScope.grid.context.deleteRowMaterial(row.entity, $event)"
                            }
                        ])
                    ]
                };
                self.grid = {
                    options: gridOptions,
                    data: [],
                    context: self
                };
                self.initialize();
            }
            initialize() {
                const self = this;
                self.viewModel = self.quarryService.materialViewModel;
                self.model = self.viewModel.model;
                self.model.materialDate = new Date();
                self.model.processTypeId = self.processTypeEnum.Cutting;
                self.viewModel.textures.unshift({ key: 0, item: "" });
                self.quarryUtility.addMaterialWatchers(self.$scope, self.model);
            }
            updateDropDownText() {
                const self = this;
                self.model.productType = self.utility.getItem(self.viewModel.productTypes, self.model.productTypeId, "productTypeId", "productTypeName");
                self.model.materialColour = self.utility.getListItem(self.viewModel.materialColours, self.model.materialColourId);
                self.model.quarry = self.utility.getListItem(self.viewModel.quarries, self.model.quarryId);
                self.model.texture = self.utility.getListItem(self.viewModel.textures, self.model.textureId);
            }
            resetModel() {
                const self = this;
                self.model.blockNumber = undefined;
                self.model.length = undefined;
                self.model.width = undefined;
                self.model.height = undefined;
                self.model.weight = undefined;
                self.model.productTypeId = undefined;
            }
            addMaterial(form) {
                const self = this;
                if (form.$valid) {
                    self.quarryUtility.clearByProcessType(self.model);
                    self.updateDropDownText();
                    self.model.index = self.grid.data.length;
                    if (self.model.textureId === 0) {
                        self.model.textureId = undefined;
                    }
                    self.grid.data.push(angular.copy(self.model));
                    self.resetModel();
                    form.$submitted = false;
                }
            }
            saveMaterial(ev) {
                const self = this;
                if (self.grid.data.length === 0) {
                    self.dialogUtility.alert("No Materials", "Please add materials to save", ev);
                }
                else {
                    self.dialogUtility.confirm("Confirm Save", "Please confirm to save the material", ev)
                        .then(function () {
                        self.quarryService.saveMaterial(self.grid.data)
                            .then(function () {
                            self.grid.data.splice(0, self.grid.data.length);
                            self.resetModel();
                        });
                    });
                }
            }
            editRowMaterial(row, ev) {
                const self = this;
                self.previousModel = angular.copy(self.model);
                angular.extend(self.model, row);
                // bypassing watchers that calculate product type and weight
                self.model.bypassWeightWatcher = true;
                self.model.bypassProductTypeWatcher = true;
                self.editMode = true;
            }
            deleteRowMaterial(row, ev) {
                const self = this;
                self.dialogUtility.confirm("Delete Material", "Are you sure you want to delete the material", ev)
                    .then(function () {
                    self.grid.data.splice(row.index, 1);
                });
            }
            cancelMaterial(form) {
                const self = this;
                angular.extend(self.model, self.previousModel);
                self.editMode = false;
            }
            updateMaterial(form) {
                const self = this;
                if (form.$valid) {
                    self.updateDropDownText();
                    angular.extend(self.grid.data[self.model.index], self.model);
                    self.resetModel();
                    self.editMode = false;
                }
            }
            checkRequired(processTypeId) {
                const self = this;
                return self.model.processTypeId === processTypeId;
            }
        };
        Material = __decorate([
            MegaMine.controller("megamine", "MegaMine.Quarry.Material"),
            MegaMine.inject("$scope", "MegaMine.Quarry.QuarryService", "MegaMine.Quarry.QuarryUtility", "MegaMine.Shared.Dialog.DialogUtility", "MegaMine.Shared.Utility", "MegaMine.Shared.Constants", "MegaMine.Shared.Template")
        ], Material);
        Quarry.Material = Material;
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Material.js.map