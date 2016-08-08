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
            let DialogUtility = class DialogUtility {
                constructor($mdDialog) {
                    this.$mdDialog = $mdDialog;
                }
                alert(title, content, ev) {
                    const self = this;
                    self.$mdDialog.show(self.$mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title(title)
                        .textContent(content)
                        .ariaLabel(title)
                        .ok("Ok")
                        .targetEvent(ev));
                }
                confirm(title, content, ev) {
                    const self = this;
                    let dialog = self.$mdDialog.confirm()
                        .parent(angular.element(document.body))
                        .title(title)
                        .textContent(content)
                        .ariaLabel(title)
                        .ok("Yes")
                        .cancel("No")
                        .targetEvent(ev);
                    return self.$mdDialog.show(dialog);
                }
            };
            DialogUtility = __decorate([
                MegaMine.service("megamine", "MegaMine.Shared.DialogUtility"),
                MegaMine.inject("$mdDialog")
            ], DialogUtility);
            Dialog.DialogUtility = DialogUtility;
        })(Dialog = Shared.Dialog || (Shared.Dialog = {}));
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=DialogUtility.js.map