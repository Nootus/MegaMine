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
        let ProductType = class ProductType {
            constructor(quarryService, utility, dialogService, messages) {
                this.quarryService = quarryService;
                this.utility = utility;
                this.dialogService = dialogService;
                this.messages = messages;
                this.validateFormulaOrder = (form) => {
                    const self = this;
                    if (form !== undefined) {
                        let counter = 0;
                        let controlName = "";
                        let formulaExists = false;
                        while (true) {
                            controlName = "formulaValue_" + counter;
                            if (form[controlName] === undefined) {
                                break;
                            }
                            if (!self.utility.isEmpty(form[controlName].$modelValue)) {
                                formulaExists = true;
                                break;
                            }
                            counter++;
                        }
                        if (form.formulaOrder !== undefined) {
                            if (formulaExists && self.utility.isEmpty(form.formulaOrder.$modelValue)) {
                                form.formulaOrder.$setValidity("orderRequired", false);
                            }
                            else {
                                form.formulaOrder.$setValidity("orderRequired", true);
                            }
                        }
                    }
                };
                this.getSelf = () => {
                    return this;
                };
                const self = this;
                angular.forEach(quarryService.productTypes.list, function (item) {
                    self.initializeModel(item);
                });
                const gridOptions = {
                    columnDefs: [
                        { name: "productTypeName", field: "productTypeName", displayName: "Product Type", type: "string" },
                        { name: "productTypeDescription", field: "productTypeDescription", type: "string", displayName: "Description" },
                        { name: "formulaString", field: "formulaString", type: "string", displayName: "Formula" },
                        { name: "formulaOrder", field: "formulaOrder", type: "string", displayName: "Formula Order" }
                    ]
                };
                self.dashboard = {
                    header: "Product Types",
                    context: self,
                    widgets: {
                        allWidgets: quarryService.productTypes.widgets.allWidgets,
                        pageWidgets: quarryService.productTypes.widgets.pageWidgets
                    },
                    records: {
                        options: {
                            primaryField: "productTypeId",
                            data: quarryService.productTypes.list,
                            view: self.viewDialog
                        },
                        list: {
                            options: {
                                fields: ["productTypeName", "productTypeDescription", "formulaString"]
                            }
                        },
                        grid: {
                            options: gridOptions
                        },
                        buttons: {
                            add: {
                                text: "New",
                                toolTip: "New Product Type",
                                claim: "Quarry:ProductTypeAdd",
                                save: self.addProductType
                            },
                            edit: {
                                claim: "Quarry:ProductTypeEdit"
                            },
                            delete: {
                                claim: "Quarry:ProductTypeDelete"
                            }
                        }
                    }
                };
            }
            initializeModel(model) {
                const self = this;
                if (model.formula === undefined) {
                    model.formula = null;
                }
                model.formulaJson = JSON.parse(model.formula);
                model.formulaString = self.getFormulaString(model.formulaJson, model.processTypeId);
                if (model.formulaJson === null) {
                    model.formulaJson = [];
                    model.formulaJson.push({ field: "Length", operand: ">=" });
                    model.formulaJson.push({ field: "Width", operand: "<=" });
                }
                return model;
            }
            getFormulaString(formulaJson, processTypeId) {
                const self = this;
                if (processTypeId === MegaMine.Quarry.Models.ProcessType.Crushing) {
                    return "";
                }
                let formulaString = "";
                angular.forEach(formulaJson, function (jsonItem) {
                    if (self.valueExists(jsonItem.value)) {
                        if (formulaString !== "") {
                            formulaString += " & ";
                        }
                        formulaString += jsonItem.field + " " + jsonItem.operand + " " + jsonItem.value;
                    }
                });
                return formulaString;
            }
            valueExists(value) {
                if (value !== "" && value !== null && value !== undefined) {
                    return true;
                }
                else {
                    return false;
                }
            }
            addProductType(ev, context) {
                const self = context;
                let model = self.initializeModel({ productTypeId: 0, processTypeId: MegaMine.Quarry.Models.ProcessType.Cutting });
                self.viewDialog(model, 1 /* save */, ev, context);
            }
            viewDialog(model, dialogMode, ev, context) {
                const self = context;
                var validator = {
                    orderErrorMessages: [{ type: "orderRequired", text: self.messages.required }],
                    validate: self.validateFormulaOrder
                };
                let disabled = dialogMode !== 1 /* save */;
                self.dialogService.show({
                    templateUrl: "product_type_dialog",
                    targetEvent: ev,
                    data: {
                        model: model, validator: validator,
                        dataOptions: { disabled: disabled, processTypeEnum: MegaMine.Quarry.Models.ProcessType }
                    },
                    dialogMode: dialogMode
                })
                    .then(function (dialogModel) {
                    // converting the ProcessTypeId to number as it will converted to string by radio button
                    dialogModel.processTypeId = Number(dialogModel.processTypeId);
                    if (dialogMode === 2 /* delete */) {
                        self.quarryService.deleteProductType(dialogModel.productTypeId).then(function () {
                            self.quarryService.getProductTypes();
                            self.dialogService.hide();
                        });
                    }
                    else {
                        if (dialogModel.processTypeId === MegaMine.Quarry.Models.ProcessType.Crushing) {
                            angular.forEach(dialogModel.formulaJson, function (item) {
                                item.value = undefined;
                            });
                        }
                        dialogModel.formula = JSON.stringify(dialogModel.formulaJson);
                        self.quarryService.saveProductType(dialogModel).then(function () {
                            // update the grid values
                            if (dialogModel.productTypeId === 0) {
                                self.quarryService.getProductTypes().then(function () {
                                    angular.forEach(self.quarryService.productTypes, function (item) {
                                        self.initializeModel(item);
                                    });
                                });
                            }
                            else {
                                model.productTypeName = dialogModel.productTypeName;
                                model.productTypeDescription = dialogModel.productTypeDescription;
                                model.processTypeId = dialogModel.processTypeId;
                                model.formulaString = self.getFormulaString(dialogModel.formulaJson, dialogModel.processTypeId);
                                model.formula = JSON.stringify(dialogModel.formulaJson);
                                model.formulaJson = angular.copy(dialogModel.formulaJson);
                                model.formulaOrder = dialogModel.formulaOrder;
                            }
                            self.dialogService.hide();
                        });
                    }
                });
            }
        };
        ProductType = __decorate([
            MegaMine.controller("megamine", "MegaMine.Quarry.ProductType"),
            MegaMine.inject("MegaMine.Quarry.QuarryService", "MegaMine.Shared.Utility", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Messages")
        ], ProductType);
        Quarry.ProductType = ProductType;
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=ProductType.js.map