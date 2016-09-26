module MegaMine.Quarry {

    @controller("megamine", "MegaMine.Quarry.ProductType")
    @inject("MegaMine.Quarry.QuarryService", "MegaMine.Shared.Utility", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Message")
    export class ProductType {

        public dashboard: Widget.Models.IDashboardModel<ProductType, Models.IProductTypeModel>;

        constructor(private quarryService: QuarryService, private utility: Shared.Utility,
            private dialogService: Shared.Dialog.DialogService<Models.IProductTypeModel>, private message: Shared.Message) {
            const self: ProductType = this;

            angular.forEach(quarryService.productTypes.list, function (item: Models.IProductTypeModel): void {
                self.initializeModel(item);
            });

            const gridOptions: uiGrid.IGridOptions = {
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

        private initializeModel(model: Models.IProductTypeModel): Models.IProductTypeModel {
            const self: ProductType = this;
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

        private getFormulaString(formulaJson: Models.IProductTypeFormulaModel[], processTypeId: number): string {
            const self: ProductType = this;
            if (processTypeId === MegaMine.Quarry.Models.ProcessType.Crushing) {
                return "";
            }
            let formulaString: string = "";
            angular.forEach(formulaJson, function (jsonItem: Models.IProductTypeFormulaModel): void {
                if (self.valueExists(jsonItem.value)) {
                    if (formulaString !== "") {
                        formulaString += " & ";
                    }
                    formulaString += jsonItem.field + " " + jsonItem.operand + " " + jsonItem.value;
                }
            });
            return formulaString;
        }

        private valueExists(value: number | string): boolean {
            if (value !== "" && value !== null && value !== undefined) {
                return true;
            } else {
                return false;
            }
        }

        public validateFormulaOrder = (form: Models.IProductTypeDialogFormController): void => {
            const self: ProductType = this;
            if (form !== undefined) {
                let counter: number = 0;
                let controlName: string = "";
                let formulaExists: boolean = false;
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

                if (formulaExists && self.utility.isEmpty(form.formulaOrder.$modelValue)) {
                    form.formulaOrder.$setValidity("orderRequired", false);
                } else {
                    form.formulaOrder.$setValidity("orderRequired", true);
                }
            }
        }

        public addProductType(ev: ng.IAngularEvent, context: ProductType): void {
            const self: ProductType = context;
            let model: Models.IProductTypeModel = self.initializeModel(
                <Models.IProductTypeModel>{ productTypeId: 0, processTypeId: MegaMine.Quarry.Models.ProcessType.Cutting }
            );
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, context);
        }

        public viewDialog(model: Models.IProductTypeModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: ng.IAngularEvent, context: ProductType): void {
            const self: ProductType = context;
            var validator: any = {
                orderErrorMessages: [{ type: "orderRequired", text: self.message.required }],
                validateFormulaOrder: self.validateFormulaOrder
            };

            let disabled: boolean = dialogMode !== Shared.Dialog.Models.DialogMode.save;

            self.dialogService.show({
                templateUrl: "product_type_dialog",
                targetEvent: ev,
                data: {
                    model: model, validator: validator,
                    dataOptions: { disabled: disabled, processTypeEnum: MegaMine.Quarry.Models.ProcessType }
                },
                dialogMode: dialogMode
            })
                .then(function (dialogModel: Models.IProductTypeModel): void {
                    // converting the ProcessTypeId to number as it will converted to string by radio button
                    dialogModel.processTypeId = Number(dialogModel.processTypeId);
                    if (dialogMode === Shared.Dialog.Models.DialogMode.delete) {
                        self.quarryService.deleteProductType(dialogModel.productTypeId).then(function (): void {
                            self.quarryService.getProductTypes();
                            self.dialogService.hide();
                        });
                    } else {
                        if (dialogModel.processTypeId === MegaMine.Quarry.Models.ProcessType.Crushing) {
                            angular.forEach(dialogModel.formulaJson,
                                function (item: Models.IProductTypeFormulaModel): void {
                                    item.value = undefined;
                                });
                        }
                        dialogModel.formula = JSON.stringify(dialogModel.formulaJson);
                        self.quarryService.saveProductType(dialogModel).then(function (): void {
                            // update the grid values
                            if (dialogModel.productTypeId === 0) {
                                self.quarryService.getProductTypes().then(function (): void {
                                    angular.forEach(self.quarryService.productTypes,
                                                    function (item: Models.IProductTypeModel): void {
                                        self.initializeModel(item);
                                    });
                                });
                            } else {
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
    }

}