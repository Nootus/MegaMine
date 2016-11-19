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
            let NtAccordion = class NtAccordion {
                constructor() {
                    // directive attributes
                    this.priority = 100;
                    this.compile = this.compileFn;
                }
                compileFn(element, templateAttributes, transclude) {
                    const self = this;
                    let id = self.getId(templateAttributes);
                    element.addClass("accordion");
                    let options = element.children("li").addClass("item");
                    // for children set the class and ng events events
                    let item = options[0];
                    angular.element(item).children("h3")
                        .addClass("header")
                        .attr("ng-click", id + "_toggle($index)")
                        .attr("ng-class", id + "_data.current === $index ? \"expand\" : \"collapse\"");
                    angular.element(item).children("div")
                        .addClass("content slideUp")
                        .attr("ng-show", id + "_data.current === $index");
                    return self.linkFn;
                }
                linkFn(scope, element, instanceAttributes, $ctrl) {
                    const self = this;
                    let id = self.getId(instanceAttributes);
                    let data = {
                        current: -1
                    };
                    scope.$parent[id + "_data"] = data;
                    scope.$parent[id + "_toggle"] = function (index) {
                        data.current = data.current === index ? -1 : index;
                    };
                }
                getId(attrs) {
                    const defaultId = "ntAccordion";
                    return attrs[defaultId] || "accordion";
                }
            };
            NtAccordion = __decorate([
                MegaMine.directive("megamine", "ntAccordion")
            ], NtAccordion);
            Directives.NtAccordion = NtAccordion;
        })(Directives = Shared.Directives || (Shared.Directives = {}));
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=NtAccordion.js.map