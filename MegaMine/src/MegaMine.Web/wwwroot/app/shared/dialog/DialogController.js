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
        var Dialog;
        (function (Dialog) {
            let DialogController = class DialogController {
                constructor($scope, $mdDialog, dialogOptions, deferred) {
                    this.$scope = $scope;
                    this.deferredPromiseState = undefined;
                    this.cancel = (ev) => {
                        const self = this;
                        ev.preventDefault();
                        self.$mdDialog.cancel();
                    };
                    this.save = (form) => {
                        this.resolveDialog(form);
                    };
                    this.deleteItem = (form) => {
                        this.resolveDialog(form);
                    };
                    const self = this;
                    // todo: due to the bug in material setting the bindToController values and calling $onInit
                    self.$mdDialog = $mdDialog;
                    self.dialogOptions = dialogOptions;
                    self.deferred = deferred;
                    self.$onInit();
                }
                $onInit() {
                    const self = this;
                    self.dialogMode = self.dialogOptions.dialogMode;
                    self.dialogError = self.dialogOptions.data.error;
                    // cloning the model & setting the additional data properties
                    angular.extend(self, self.dialogOptions.data);
                    if (self.dialogOptions.data.model !== undefined) {
                        self.model = angular.copy(self.dialogOptions.data.model);
                    }
                    if (self.dialogOptions.dialogInit !== undefined) {
                        self.dialogOptions.dialogInit(self, self.model);
                    }
                }
                resolveDialog(form) {
                    const self = this;
                    if (form.$valid) {
                        if (self.deferredPromiseState === undefined) {
                            self.deferredPromiseState = angular.copy(self.deferred.promise.$$state);
                        }
                        angular.extend(self.deferred.promise.$$state, self.deferredPromiseState);
                        self.deferred.resolve(self.model);
                    }
                }
            };
            DialogController = __decorate([
                MegaMine.controller("megamine", "MegaMine.Shared.Dialog.DialogController"),
                MegaMine.inject("$scope", "$mdDialog", "dialogOptions", "deferred")
            ], DialogController);
            Dialog.DialogController = DialogController;
        })(Dialog = Shared.Dialog || (Shared.Dialog = {}));
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=DialogController.js.map