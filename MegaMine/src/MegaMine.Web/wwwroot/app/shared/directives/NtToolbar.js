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
        var Directives;
        (function (Directives) {
            let NtToolbar_1;
            let NtToolbar = NtToolbar_1 = class NtToolbar {
                constructor(utility) {
                    this.utility = utility;
                    // directive attributes
                    this.restrict = "E";
                    this.scope = {
                        header: "@"
                    };
                    this.link = this.linkFn;
                    this.template = this.getTemplate();
                    this.controller = NtToolbar_1;
                    this.controllerAs = "$ctrl";
                    this.transclude = true;
                }
                getTemplate() {
                    return `<md-toolbar>
                    <div class="md-toolbar-tools" layout="row">
                    <h2 flex>{{header}}</h2>
                    <div ng-transclude></div>
                    </div>
                </md-toolbar>`;
                }
                linkFn(scope, element, instanceAttributes, $ctrl) {
                    const self = $ctrl;
                    if (self.utility.isEmpty(instanceAttributes["class"])) {
                        instanceAttributes.$addClass("command-bar");
                    }
                }
            };
            NtToolbar = NtToolbar_1 = __decorate([
                MegaMine.directive("megamine", "ntToolbar"),
                MegaMine.inject("MegaMine.Shared.Utility")
            ], NtToolbar);
            Directives.NtToolbar = NtToolbar;
        })(Directives = Shared.Directives || (Shared.Directives = {}));
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=NtToolbar.js.map