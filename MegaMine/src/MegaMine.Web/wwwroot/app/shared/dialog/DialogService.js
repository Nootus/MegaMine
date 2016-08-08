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
            let DialogService = class DialogService {
                constructor($q, $mdDialog) {
                    this.$q = $q;
                    this.$mdDialog = $mdDialog;
                    this.dialogModel = {};
                    this.deferred = undefined;
                }
                show(options) {
                    const self = this;
                    self.deferred = self.$q.defer();
                    self.$mdDialog.show({
                        controller: Dialog.DialogController,
                        controllerAs: "vm",
                        templateUrl: options.templateUrl,
                        template: options.template,
                        targetEvent: options.targetEvent,
                        locals: { dialogOptions: options, deferred: self.deferred, $mdDialog: self.$mdDialog },
                        resolve: options.resolve,
                        bindToController: true
                    });
                    return self.deferred.promise;
                }
                hide() {
                    this.$mdDialog.hide();
                }
            };
            DialogService = __decorate([
                MegaMine.service("megamine", "MegaMine.Shared.DialogService"),
                MegaMine.inject("$q", "$mdDialog")
            ], DialogService);
            Dialog.DialogService = DialogService;
        })(Dialog = Shared.Dialog || (Shared.Dialog = {}));
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=DialogService.js.map