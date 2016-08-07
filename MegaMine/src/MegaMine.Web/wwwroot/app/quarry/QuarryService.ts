module MegaMine.Quarry {

    @service("megamine", "MegaMine.Quarry.QuarryService")
    @inject("$http", "MegaMine.Shared.Utility")
    export class QuarryService {


        constructor(private $http: ng.IHttpService, private utility: Shared.Utility) {
        }

        // colours
        public colours: Widget.Models.IDashboardDataModel<Models.IMaterialColourModel> = {
            list: [], widgets: <Widget.Models.IDashboardWidgets>{}
        };
        colourListItems: Shared.Models.IListItem<number, string>[] = [];

        // product types
        public productTypes: Widget.Models.IDashboardDataModel<Models.IProductTypeModel> = {
            list: [], widgets: <Widget.Models.IDashboardWidgets>{}
        };
        productTypeList: Models.IProductTypeModel[] = [];

        // textures
        textures: Models.ITextureModel[] = [];

        // quarries
        public quarries: Widget.Models.IDashboardDataModel<Models.IQuarryModel> = {
            list: [], widgets: <Widget.Models.IDashboardWidgets>{}
        };

        // yards
        public yards: Widget.Models.IDashboardDataModel<Models.IYardModel> = {
            list: [], widgets: <Widget.Models.IDashboardWidgets>{}
        };
        public yardList: Models.IYardModel[] = [];
        public groupYards: Models.IYardModel[] = [];

        // material
        public materialViewModel: Models.IMaterialViewModel = <Models.IMaterialViewModel>{};

        // stockyard & Material Movement
        public stock: Models.IStockModel[] = [];

        // reports
        public quarrySummary = [];
        public quarrySummaryDetails: Models.IStockModel[] = [];

        // product summary
        public productSummaryVM: Models.IProductSummaryViewModel = <Models.IProductSummaryViewModel>{};
        public productSummary: Models.IProductSummaryModel[] = [];
        public productSummaryDetails: Models.IStockModel[] = [];

        // material Colour
        public getMaterialColours(): ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IMaterialColourModel[]>> {
            const self: QuarryService = this;
            return self.$http.get("/api/quarry/materialcoloursget")
                .then(function (data: Shared.Models.IAjaxDataModel<Models.IMaterialColourModel[]>):
                                                        Shared.Models.IAjaxDataModel<Models.IMaterialColourModel[]> {
                    self.utility.extend(self.colours.list, data.model);
                    angular.extend(self.colours.widgets, data.dashboard);
                    return data;
                });
        }

        public getMaterialColourListItems(): ng.IHttpPromise<Shared.Models.IListItem<number, string>[]> {
            const self: QuarryService = this;
            return self.$http.get("/api/quarry/materialcolourlistitemsget")
                .then(function (data: Shared.Models.IListItem<number, string>[]): Shared.Models.IListItem<number, string>[] {
                    self.utility.extend(self.colourListItems, data);
                    return data;
                });
        }

        public saveMaterialColour(model: Models.IMaterialColourModel): ng.IHttpPromise<void> {
            const self: QuarryService = this;
            let url: string;
            if (model.materialColourId === 0) {
                url = "/api/quarry/materialcolouradd";
            } else {
                url = "/api/quarry/materialcolourupdate";
            }

            return self.$http.post<void>(url, model);
        }

        public deleteMaterialColour(materialColourId: number): ng.IHttpPromise<void> {
            const self: QuarryService = this;
            return self.$http.post<void>("/api/quarry/materialcolourdelete", materialColourId);
        }

        // product types
        public getProductTypes(): ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IProductTypeModel[]>> {
            const self: QuarryService = this;
            return self.$http.get("/api/quarry/producttypesget")
                .then(function (data: Shared.Models.IAjaxDataModel<Models.IProductTypeModel[]>):
                                                Shared.Models.IAjaxDataModel<Models.IProductTypeModel[]> {
                    self.utility.extend(self.productTypes.list, data.model);
                    angular.extend(self.productTypes.widgets, data.dashboard);
                    return data;
                });
        }

        public getProductTypeList(): ng.IHttpPromise<Models.IProductTypeModel[]> {
            const self: QuarryService = this;
            return self.$http.get("/api/quarry/producttypelistget")
                .then(function (data: Models.IProductTypeModel[]): Models.IProductTypeModel[] {
                    self.utility.extend(self.productTypeList, data);
                    return data;
                });
        }

        public saveProductType(model: Models.IProductTypeModel): ng.IHttpPromise<void> {
            const self: QuarryService = this;

            var url: string;
            if (model.productTypeId === 0) {
                url = "/api/quarry/producttypeadd";
            } else {
                url = "/api/quarry/producttypeupdate";
            }

            return self.$http.post<void>(url, model);
        }

        public deleteProductType(productTypeId: number): ng.IHttpPromise<void> {
            const self: QuarryService = this;
            return self.$http.post<void>("/api/quarry/producttypedelete", productTypeId);
        }

        // textures
        public getTextures(): ng.IHttpPromise<Models.ITextureModel[]> {
            const self: QuarryService = this;
            return self.$http.get("/api/quarry/texturesget")
                .then(function (data: Models.ITextureModel[]): Models.ITextureModel[] {
                    self.utility.extend(self.textures, data);
                    return data;
                });
        }

        public saveTexture(model: Models.ITextureModel): ng.IHttpPromise<void> {
            const self: QuarryService = this;
            var url: string;
            if (model.textureId === 0) {
                url = "/api/quarry/textureadd";
            } else {
                url = "/api/quarry/textureupdate";
            }

            return self.$http.post<void>(url, model);
        }

        public deleteTexture(textureId: number): ng.IHttpPromise<void> {
            const self: QuarryService = this;
            return self.$http.post<void>("/api/quarry/texturedelete", textureId);
        }

        // quarry
        public getQuarries(): ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IQuarryModel[]>> {
            const self: QuarryService = this;
            return self.$http.get("/api/quarry/quarriesget")
                .then(function (data: Shared.Models.IAjaxDataModel<Models.IQuarryModel[]>):
                                                Shared.Models.IAjaxDataModel<Models.IQuarryModel[]> {
                    self.utility.extend(self.quarries.list, data.model);
                    angular.extend(self.quarries.widgets, data.dashboard);
                    return data;
                });
        }

        public saveQuarry(model: Models.IQuarryModel): ng.IHttpPromise<void> {
            const self: QuarryService = this;
            var url: string;
            if (model.quarryId === 0) {
                url = "/api/quarry/quarryadd";
            } else {
                url = "/api/quarry/quarryupdate";
            }

            return self.$http.post<void>(url, model);
        }

        public deleteQuarry(quarryId: number): ng.IHttpPromise<void> {
            const self: QuarryService = this;
            return self.$http.post<void>("/api/quarry/quarrydelete", quarryId);
        }

        // yards
        public getYardList(): ng.IHttpPromise<Models.IYardModel[]> {
            const self: QuarryService = this;
            return self.$http.get("/api/quarry/yardlistget")
                .then(function (data: Models.IYardModel[]): Models.IYardModel[] {
                    self.utility.extend(self.yardList, data);
                    return data;
                });
        }

        public getYards(): ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IYardModel[]>> {
            const self: QuarryService = this;
            return self.$http.get("/api/quarry/yardsget")
                .then(function (data: Shared.Models.IAjaxDataModel<Models.IYardModel[]>):
                                                            Shared.Models.IAjaxDataModel<Models.IYardModel[]> {
                    self.utility.extend(self.yards.list, data.model);
                    angular.extend(self.yards.widgets, data.dashboard);
                    return data;
                });
        }

        public getGroupYards(): ng.IHttpPromise<Models.IYardModel[]> {
            const self: QuarryService = this;
            return self.$http.get("/api/quarry/groupyardsget")
                .then(function (data: Models.IYardModel[]): Models.IYardModel[] {
                    self.utility.extend(self.groupYards, data);
                    return data;
                });
        }


        public saveYard(model: Models.IYardModel): ng.IHttpPromise<void> {
            const self: QuarryService = this;
            var url: string;
            if (model.yardId === 0) {
                url = "/api/quarry/yardadd";
            } else {
                url = "/api/quarry/yardupdate";
            }

            return self.$http.post<void>(url, model);
        }

        public deleteYard(yardId: number): ng.IHttpPromise<void> {
            const self: QuarryService = this;
            return self.$http.post<void>("/api/quarry/yarddelete", yardId);
        }


        // material
        public getMaterialViewModel(): ng.IHttpPromise<Models.IMaterialViewModel> {
            const self: QuarryService = this;
            return self.$http.get("/api/quarry/materialviewmodelget")
                .then(function (data: Models.IMaterialViewModel): Models.IMaterialViewModel {
                    angular.extend(self.materialViewModel, data);
                    return data;
                });
        }
        public saveMaterial(models: Models.IMaterialModel[]): ng.IHttpPromise<void> {
            const self: QuarryService = this;
            return self.$http.post<void>("/api/quarry/materialsave", models);
        }

        // stock & material movement
        public getStock(yardId: number): ng.IHttpPromise<Models.IStockModel[]> {
            const self: QuarryService = this;
            return self.$http.get("/api/quarry/stockget", { params: { "yardId": yardId } })
                .then(function (data: Models.IStockModel[]): Models.IStockModel[] {
                    self.utility.extend(self.stock, data);
                    return data;
                });
        }

        public moveMaterial(model: Models.IMaterialMovementModel): ng.IHttpPromise<Models.IStockModel[]> {
            const self: QuarryService = this;
            return self.$http.post("/api/quarry/movematerial", model)
                .then(function (data: Models.IStockModel[]): Models.IStockModel[] {
                    self.utility.extend(self.stock, data);
                    return data;
                });
        }

        public materialUpdate(model: Models.IMaterialModel): ng.IHttpPromise<Models.IStockModel[]> {
            const self: QuarryService = this;
            return self.$http.post("/api/quarry/materialupdate", model, { params: { "yardId": model.currentYardId } })
                .then(function (data: Models.IStockModel[]): Models.IStockModel[] {
                    self.utility.extend(self.stock, data);
                    return data;
                });
        }

        public materialDelete(materialId: number, yardId: number): ng.IHttpPromise<Models.IStockModel[]> {
            const self: QuarryService = this;
            return self.$http.post("/api/quarry/materialdelete", null, { params: { "materialId": materialId, "yardId": yardId } })
                .then(function (data: Models.IStockModel[]): Models.IStockModel[] {
                    self.utility.extend(self.stock, data);
                    return data;
                });
        }

        // reports
        public quarrySummaryGet(searchParams: Models.IQuarrySummarySearchModel): ng.IHttpPromise<string> {
            const self: QuarryService = this;
            return self.$http.post("/api/quarry/quarrysummary", searchParams)
                .then(function (data: string): string {
                    self.quarrySummary.splice(0, self.quarrySummary.length);
                    if (data !== "") {
                        angular.extend(self.quarrySummary, JSON.parse(data));
                    }
                    return data;
                });
        }

        public getQuarrySummaryDetails(searchParams: Models.IQuarrySummarySearchModel): ng.IHttpPromise<Models.IStockModel[]> {
            const self: QuarryService = this;
            return self.$http.post("/api/quarry/quarrysummarydetails", searchParams)
                .then(function (data: Models.IStockModel[]): Models.IStockModel[] {
                    self.utility.extend(self.quarrySummaryDetails, data);
                    return data;
                });
        }

        public productSummaryGet(): ng.IHttpPromise<Models.IProductSummaryViewModel> {
            const self: QuarryService = this;
            // productSummaryVM
            return self.$http.get("/api/quarry/productsummary")
                .then(function (data: Models.IProductSummaryViewModel): Models.IProductSummaryViewModel {
                    self.productSummaryVM.quarries = data.quarries;
                    self.productSummaryVM.productTypes = data.productTypes;
                    self.productSummaryVM.colours = data.colours;

                    self.utility.extend(self.productSummary, data.summary);
                    return data;
                });
        }

        public productSummarySearch(searchParams: Models.IProductSummarySearchModel): ng.IHttpPromise<Models.IProductSummaryModel[]> {
            const self: QuarryService = this;
            return self.$http.post("/api/quarry/productsummarysearch", searchParams)
                .then(function (data: Models.IProductSummaryModel[]): Models.IProductSummaryModel[] {
                    self.utility.extend(self.productSummary, data);
                    return data;
                });
        }

        public getProductSummaryDetails(searchParams: Models.IProductSummarySearchModel): ng.IHttpPromise<Models.IStockModel[]> {
            const self: QuarryService = this;
            return self.$http.post("/api/quarry/productsummarydetails", searchParams)
                .then(function (data: Models.IStockModel[]): Models.IStockModel[] {
                    self.utility.extend(self.productSummaryDetails, data);
                    return data;
                });
        }

    }
}