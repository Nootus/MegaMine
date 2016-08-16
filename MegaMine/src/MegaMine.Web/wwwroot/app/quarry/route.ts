module MegaMine.Quarry {

    @config("megamine")
    @inject("$stateProvider", "$windowProvider")
    class Route {
        constructor($stateProvider: ng.ui.IStateProvider, $windowProvider: ng.IServiceProvider) {
            let virtualPath: string = $windowProvider.$get().virtualDirectory;

            $stateProvider
                .state("colour", {
                    url: virtualPath + "/colour",
                    title: "Product Colour",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/materialColour.html",
                    controller: MaterialColour,
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["MegaMine.Quarry.QuarryService", function (quarryService: QuarryService):
                            ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IMaterialColourModel[]>> {
                            return quarryService.getMaterialColours();
                        }]
                    }
                })
                .state("producttype", {
                    url: virtualPath + "/producttype",
                    title: "Product Type",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/productType.html",
                    controller: ProductType,
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["MegaMine.Quarry.QuarryService", function (quarryService: QuarryService):
                            ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IProductTypeModel[]>> {
                            return quarryService.getProductTypes();
                        }]
                    }
                })
                .state("texture", {
                    url: virtualPath + "/texture",
                    title: "Texture",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/texture.html",
                    controller: Texture,
                    controllerAs: "$ctrl",
                    resolve: {
                        resolveModel: ["MegaMine.Quarry.QuarryService", function (quarryService: QuarryService):
                            ng.IHttpPromise<Models.ITextureModel[]> {
                            return quarryService.getTextures();
                        }]
                    }
                })
                .state("quarry", {
                    url: virtualPath + "/quarry",
                    title: "Quarry",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/quarry.html",
                    controller: Quarry,
                    controllerAs: "$ctrl",
                    resolve: {
                        quarries: ["MegaMine.Quarry.QuarryService", function (quarryService: QuarryService):
                            ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IQuarryModel[]>> {
                            return quarryService.getQuarries();
                        }],
                        colours: ["MegaMine.Quarry.QuarryService", function (quarryService: QuarryService):
                            ng.IHttpPromise<Shared.Models.IListItem<number, string>[]> {
                            return quarryService.getMaterialColourListItems();
                        }]
                    }
                })
                .state("yard", {
                    url: virtualPath + "/yard",
                    title: "Yard",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/yard.html",
                    controller: Yard,
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["MegaMine.Quarry.QuarryService", function (quarryService: QuarryService):
                            ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IYardModel[]>> {
                            return quarryService.getYards();
                        }]
                    }
                })
                .state("material", {
                    url: virtualPath + "/material",
                    title: "Add Material",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/material.html",
                    controller: "material",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["MegaMine.Quarry.QuarryService", function (quarryService: QuarryService):
                            ng.IHttpPromise<Models.IMaterialViewModel> {
                            return quarryService.getMaterialViewModel();
                        }]
                    }
                })
                .state("yardstock", {
                    url: virtualPath + "/stockyard",
                    title: "Stock at Yard",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/stockyard.html",
                    controller: Stockyard,
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["MegaMine.Quarry.QuarryService", function (quarryService: QuarryService):
                            ng.IHttpPromise<Models.IYardModel[]> {
                            return quarryService.getYardList();
                        }]
                    }
                })
                .state("materialmovement", {
                    url: virtualPath + "/materialmovement",
                    title: "Material Movement",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/materialmovement.html",
                    controller: "materialMovement",
                    controllerAs: "vm",
                    resolve: {
                        yards: ["MegaMine.Quarry.QuarryService", function (quarryService: QuarryService):
                            ng.IHttpPromise<Models.IYardModel[]> {
                            return quarryService.getYardList();
                        }],
                        groupYards: ["MegaMine.Quarry.QuarryService", function (quarryService: QuarryService):
                            ng.IHttpPromise<Models.IYardModel[]> {
                            return quarryService.getGroupYards();
                        }]
                    }
                })
                .state("quarrysummary", {
                    url: virtualPath + "/quarrysummary",
                    title: "Quarry Summary",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/quarrysummary.html",
                    controller: QuarrySummary,
                    controllerAs: "vm",
                    resolve: {
                        productTypes: ["MegaMine.Quarry.QuarryService", function (quarryService: QuarryService):
                            ng.IHttpPromise<Models.IProductTypeModel[]> {
                            return quarryService.getProductTypeList();
                        }],
                        quarrySummaryData: ["MegaMine.Quarry.QuarryService", function (quarryService: QuarryService):
                            ng.IHttpPromise<string> {
                            return quarryService.quarrySummaryGet(<Models.IQuarrySummarySearchModel>{});
                        }]
                    }
                })
                .state("productsummary", {
                    url: virtualPath + "/productsummary",
                    title: "Product Summary",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/productsummary.html",
                    controller: ProductSummary,
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["MegaMine.Quarry.QuarryService", function (quarryService: QuarryService):
                            ng.IHttpPromise<Models.IProductSummaryViewModel> {
                            return quarryService.productSummaryGet();
                        }]
                    }
                });
        }
    }
}