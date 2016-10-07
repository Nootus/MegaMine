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
        let QuarryService = class QuarryService {
            constructor($http, utility) {
                this.$http = $http;
                this.utility = utility;
                // colours
                this.colours = {
                    list: [], widgets: {}
                };
                this.colourListItems = [];
                // product types
                this.productTypes = {
                    list: [], widgets: {}
                };
                this.productTypeList = [];
                // textures
                this.textures = [];
                // quarries
                this.quarries = {
                    list: [], widgets: {}
                };
                // yards
                this.yards = {
                    list: [], widgets: {}
                };
                this.yardList = [];
                this.groupYards = [];
                // material
                this.materialViewModel = {};
                // stockyard & Material Movement
                this.stock = [];
                // reports
                this.quarrySummary = [];
                this.quarrySummaryDetails = [];
                // product summary
                this.productSummaryVM = {};
                this.productSummary = [];
                this.productSummaryDetails = [];
            }
            // material Colour
            getMaterialColours() {
                const self = this;
                return self.$http.get("/api/quarry/materialcoloursget")
                    .then(function (data) {
                    self.utility.extend(self.colours.list, data.model);
                    angular.extend(self.colours.widgets, data.dashboard);
                    return data;
                });
            }
            getMaterialColourListItems() {
                const self = this;
                return self.$http.get("/api/quarry/materialcolourlistitemsget")
                    .then(function (data) {
                    self.utility.extend(self.colourListItems, data);
                    return data;
                });
            }
            saveMaterialColour(model) {
                const self = this;
                let url;
                if (model.materialColourId === 0) {
                    url = "/api/quarry/materialcolouradd";
                }
                else {
                    url = "/api/quarry/materialcolourupdate";
                }
                return self.$http.post(url, model);
            }
            deleteMaterialColour(materialColourId) {
                const self = this;
                return self.$http.post("/api/quarry/materialcolourdelete", materialColourId);
            }
            // product types
            getProductTypes() {
                const self = this;
                return self.$http.get("/api/quarry/producttypesget")
                    .then(function (data) {
                    self.utility.extend(self.productTypes.list, data.model);
                    angular.extend(self.productTypes.widgets, data.dashboard);
                    return data;
                });
            }
            getProductTypeList() {
                const self = this;
                return self.$http.get("/api/quarry/producttypelistget")
                    .then(function (data) {
                    self.utility.extend(self.productTypeList, data);
                    return data;
                });
            }
            saveProductType(model) {
                const self = this;
                var url;
                if (model.productTypeId === 0) {
                    url = "/api/quarry/producttypeadd";
                }
                else {
                    url = "/api/quarry/producttypeupdate";
                }
                return self.$http.post(url, model);
            }
            deleteProductType(productTypeId) {
                const self = this;
                return self.$http.post("/api/quarry/producttypedelete", productTypeId);
            }
            // textures
            getTextures() {
                const self = this;
                return self.$http.get("/api/quarry/texturesget")
                    .then(function (data) {
                    self.utility.extend(self.textures, data);
                    return data;
                });
            }
            saveTexture(model) {
                const self = this;
                var url;
                if (model.textureId === 0) {
                    url = "/api/quarry/textureadd";
                }
                else {
                    url = "/api/quarry/textureupdate";
                }
                return self.$http.post(url, model);
            }
            deleteTexture(textureId) {
                const self = this;
                return self.$http.post("/api/quarry/texturedelete", textureId);
            }
            // quarry
            getQuarries() {
                const self = this;
                return self.$http.get("/api/quarry/quarriesget")
                    .then(function (data) {
                    self.utility.extend(self.quarries.list, data.model);
                    angular.extend(self.quarries.widgets, data.dashboard);
                    return data;
                });
            }
            saveQuarry(model) {
                const self = this;
                var url;
                if (model.quarryId === 0) {
                    url = "/api/quarry/quarryadd";
                }
                else {
                    url = "/api/quarry/quarryupdate";
                }
                return self.$http.post(url, model);
            }
            deleteQuarry(quarryId) {
                const self = this;
                return self.$http.post("/api/quarry/quarrydelete", quarryId);
            }
            // yards
            getYardList() {
                const self = this;
                return self.$http.get("/api/quarry/yardlistget")
                    .then(function (data) {
                    self.utility.extend(self.yardList, data);
                    return data;
                });
            }
            getYards() {
                const self = this;
                return self.$http.get("/api/quarry/yardsget")
                    .then(function (data) {
                    self.utility.extend(self.yards.list, data.model);
                    angular.extend(self.yards.widgets, data.dashboard);
                    return data;
                });
            }
            getGroupYards() {
                const self = this;
                return self.$http.get("/api/quarry/groupyardsget")
                    .then(function (data) {
                    self.utility.extend(self.groupYards, data);
                    return data;
                });
            }
            saveYard(model) {
                const self = this;
                var url;
                if (model.yardId === 0) {
                    url = "/api/quarry/yardadd";
                }
                else {
                    url = "/api/quarry/yardupdate";
                }
                return self.$http.post(url, model);
            }
            deleteYard(yardId) {
                const self = this;
                return self.$http.post("/api/quarry/yarddelete", yardId);
            }
            // material
            getMaterialViewModel() {
                const self = this;
                return self.$http.get("/api/quarry/materialviewmodelget")
                    .then(function (data) {
                    angular.extend(self.materialViewModel, data);
                    return data;
                });
            }
            saveMaterial(models) {
                const self = this;
                return self.$http.post("/api/quarry/materialsave", models);
            }
            // stock & material movement
            getStock(yardId) {
                const self = this;
                return self.$http.get("/api/quarry/stockget", { params: { "yardId": yardId } })
                    .then(function (data) {
                    self.utility.extend(self.stock, data);
                    return data;
                });
            }
            moveMaterial(model) {
                const self = this;
                return self.$http.post("/api/quarry/movematerial", model)
                    .then(function (data) {
                    self.utility.extend(self.stock, data);
                    return data;
                });
            }
            materialUpdate(model) {
                const self = this;
                return self.$http.post("/api/quarry/materialupdate", model, { params: { "yardId": model.currentYardId } })
                    .then(function (data) {
                    self.utility.extend(self.stock, data);
                    return data;
                });
            }
            materialDelete(materialId, yardId) {
                const self = this;
                return self.$http.post("/api/quarry/materialdelete", null, { params: { "materialId": materialId, "yardId": yardId } })
                    .then(function (data) {
                    self.utility.extend(self.stock, data);
                    return data;
                });
            }
            // reports
            quarrySummaryGet(searchParams) {
                const self = this;
                return self.$http.post("/api/quarry/quarrysummary", searchParams)
                    .then(function (data) {
                    self.quarrySummary.splice(0, self.quarrySummary.length);
                    if (data !== "") {
                        angular.extend(self.quarrySummary, JSON.parse(data));
                    }
                    return data;
                });
            }
            getQuarrySummaryDetails(searchParams) {
                const self = this;
                return self.$http.post("/api/quarry/quarrysummarydetails", searchParams)
                    .then(function (data) {
                    self.utility.extend(self.quarrySummaryDetails, data);
                    return data;
                });
            }
            productSummaryGet() {
                const self = this;
                // productSummaryVM
                return self.$http.get("/api/quarry/productsummary")
                    .then(function (data) {
                    self.productSummaryVM.quarries = data.quarries;
                    self.productSummaryVM.productTypes = data.productTypes;
                    self.productSummaryVM.colours = data.colours;
                    self.utility.extend(self.productSummary, data.summary);
                    return data;
                });
            }
            productSummarySearch(searchParams) {
                const self = this;
                return self.$http.post("/api/quarry/productsummarysearch", searchParams)
                    .then(function (data) {
                    self.utility.extend(self.productSummary, data);
                    return data;
                });
            }
            getProductSummaryDetails(searchParams) {
                const self = this;
                return self.$http.post("/api/quarry/productsummarydetails", searchParams)
                    .then(function (data) {
                    self.utility.extend(self.productSummaryDetails, data);
                    return data;
                });
            }
        };
        QuarryService = __decorate([
            MegaMine.service("megamine", "MegaMine.Quarry.QuarryService"),
            MegaMine.inject("$http", "MegaMine.Shared.Utility")
        ], QuarryService);
        Quarry.QuarryService = QuarryService;
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=QuarryService.js.map