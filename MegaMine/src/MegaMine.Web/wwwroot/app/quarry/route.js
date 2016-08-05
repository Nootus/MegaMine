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
        let Route = class Route {
            constructor($stateProvider, $windowProvider) {
                var virtualPath = $windowProvider.$get().virtualDirectory;
                $stateProvider
                    .state("colour", {
                    url: virtualPath + "/colour",
                    title: "Product Colour",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/materialColour.html",
                    controller: "materialColour",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["quarryService", function (quarryService) {
                                return quarryService.getMaterialColours();
                            }]
                    }
                })
                    .state("producttype", {
                    url: virtualPath + "/producttype",
                    title: "Product Type",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/productType.html",
                    controller: "productType",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["quarryService", function (quarryService) {
                                return quarryService.getProductTypes();
                            }]
                    }
                })
                    .state("texture", {
                    url: virtualPath + "/texture",
                    title: "Texture",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/texture.html",
                    controller: MegaMine.Quarry.Texture,
                    controllerAs: "$ctrl",
                    resolve: {
                        resolveModel: ["quarryService", function (quarryService) {
                                return quarryService.getTextures();
                            }]
                    }
                })
                    .state("quarry", {
                    url: virtualPath + "/quarry",
                    title: "Quarry",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/quarry.html",
                    controller: "MegaMine.Quarry.Quarry",
                    controllerAs: "$ctrl",
                    resolve: {
                        quarries: ["quarryService", function (quarryService) {
                                return quarryService.getQuarries();
                            }],
                        colours: ["quarryService", function (quarryService) {
                                return quarryService.getMaterialColourListItems();
                            }]
                    }
                })
                    .state("yard", {
                    url: virtualPath + "/yard",
                    title: "Yard",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/yard.html",
                    controller: MegaMine.Quarry.Yard,
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["quarryService", function (quarryService) {
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
                        resolveModel: ["quarryService", function (quarryService) {
                                return quarryService.getMaterialViewModel();
                            }]
                    }
                })
                    .state("yardstock", {
                    url: virtualPath + "/stockyard",
                    title: "Stock at Yard",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/stockyard.html",
                    controller: "stockyard",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["quarryService", function (quarryService) {
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
                        yards: ["quarryService", function (quarryService) {
                                return quarryService.getYardList();
                            }],
                        groupYards: ["quarryService", function (quarryService) {
                                return quarryService.getGroupYards();
                            }]
                    }
                })
                    .state("quarrysummary", {
                    url: virtualPath + "/quarrysummary",
                    title: "Quarry Summary",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/quarrysummary.html",
                    controller: "quarrySummary",
                    controllerAs: "vm",
                    resolve: {
                        productTypes: ["quarryService", function (quarryService) {
                                return quarryService.getProductTypeList();
                            }],
                        quarrySummaryData: ["quarryService", function (quarryService) {
                                return quarryService.quarrySummaryGet({});
                            }]
                    }
                })
                    .state("productsummary", {
                    url: virtualPath + "/productsummary",
                    title: "Product Summary",
                    previousState: "dashboard",
                    templateUrl: "/app/quarry/productsummary.html",
                    controller: "productSummary",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["quarryService", function (quarryService) {
                                return quarryService.productSummaryGet();
                            }]
                    }
                });
            }
        };
        Route = __decorate([
            MegaMine.config("megamine"),
            MegaMine.inject("$stateProvider", "$windowProvider")
        ], Route);
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Route.js.map