var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Shared;
    (function (Shared) {
        "use strict";
        var DialogService = (function () {
            function DialogService($q, $mdDialog) {
                this.$q = $q;
                this.$mdDialog = $mdDialog;
                this.dialogModel = {};
                this.deferred = undefined;
            }
            DialogService.prototype.show = function (options) {
                var self = this;
                self.deferred = self.$q.defer();
                self.$mdDialog.show({
                    controller: DialogController,
                    controllerAs: "vm",
                    templateUrl: options.templateUrl,
                    template: options.template,
                    targetEvent: options.targetEvent,
                    locals: { dialogOptions: options, deferred: self.deferred, $mdDialog: self.$mdDialog },
                    resolve: options.resolve,
                    bindToController: true
                });
                return self.deferred.promise;
            };
            DialogService.prototype.hide = function () {
                this.$mdDialog.hide();
            };
            DialogService = __decorate([
                MegaMine.service("megamine", "MegaMine.Shared.DialogService"),
                MegaMine.inject("$q", "$mdDialog")
            ], DialogService);
            return DialogService;
        }());
        Shared.DialogService = DialogService;
        var DialogController = (function () {
            function DialogController($scope) {
                var _this = this;
                this.$scope = $scope;
                this.deferredPromiseState = undefined;
                this.cancel = function (ev) {
                    var self = _this;
                    ev.preventDefault();
                    self.$mdDialog.cancel();
                };
                this.save = function (form) {
                    _this.resolveDialog(form);
                };
                this.deleteItem = function (form) {
                    _this.resolveDialog(form);
                };
                var self = this;
                self.initialize();
            }
            DialogController.prototype.initialize = function () {
                var self = this;
                self.dialogMode = self.dialogOptions.dialogMode;
                self.dialogError = self.dialogOptions.data.error;
                // cloning the model & setting the additional data properties
                angular.extend(self, self.dialogOptions.data);
                if (self.dialogOptions.data.model !== undefined) {
                    self.model = angular.copy(self.dialogOptions.data.model);
                }
                if (self.dialogOptions.dialogInit !== undefined) {
                    self.dialogOptions.dialogInit(self.$scope, self.model);
                }
            };
            DialogController.prototype.resolveDialog = function (form) {
                var self = this;
                if (form.$valid) {
                    if (self.deferredPromiseState === undefined) {
                        self.deferredPromiseState = angular.copy(self.deferred.promise.$$state);
                    }
                    angular.extend(self.deferred.promise.$$state, self.deferredPromiseState);
                    self.deferred.resolve(self.model);
                }
            };
            DialogController = __decorate([
                MegaMine.inject("$scope")
            ], DialogController);
            return DialogController;
        }());
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=DialogService.js.map