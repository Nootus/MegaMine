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
        let Template = class Template {
            getButtonDefaultColumnDefs(field, editClaim, deleteClaim, hide) {
                const self = this;
                var buttons = [{ buttonType: 0 /* view */ },
                    { buttonType: 1 /* edit */, claim: editClaim }];
                if (deleteClaim !== undefined) {
                    buttons.push({ buttonType: 2 /* delete */, claim: deleteClaim });
                }
                return self.getButtonColumnDefs(field, buttons, hide);
            }
            getButtonColumnDefs(field, buttons, hide) {
                var buttonColumnDef = {
                    name: field,
                    field: field,
                    displayName: "",
                    enableColumnMenu: false,
                    type: "string",
                    exporterSuppressExport: true,
                    cellTemplate: "",
                    cellClass: "text-center", enableHiding: false
                };
                var toolTip;
                var iconCss;
                angular.forEach(buttons, function (button) {
                    button.ngClick = button.ngClick === undefined ?
                        `grid.appScope.grid.view(row.entity, ${button.buttonType}, $event, grid.appScope.grid.context)`
                        : button.ngClick;
                    switch (button.buttonType) {
                        case 0 /* view */:
                            toolTip = "View";
                            iconCss = "eye";
                            break;
                        case 1 /* edit */:
                            toolTip = "Edit";
                            iconCss = "pencil-square-o";
                            break;
                        case 2 /* delete */:
                            toolTip = "Delete";
                            iconCss = "trash";
                            break;
                    }
                    buttonColumnDef.cellTemplate += `<nt-button type="grid" tool-tip="${toolTip}" icon-css="${iconCss}"`;
                    if (button.claim !== undefined) {
                        buttonColumnDef.cellTemplate += ` claim="${button.claim}"`;
                    }
                    buttonColumnDef.cellTemplate += ` ng-click="${button.ngClick}"></nt-button>`;
                });
                if (hide !== undefined) {
                    buttonColumnDef.cellTemplate = `<span ng-hide="${hide}">${buttonColumnDef.cellTemplate}</span>`;
                }
                return buttonColumnDef;
            }
        };
        Template = __decorate([
            MegaMine.service("megamine", "MegaMine.Shared.Template"),
            MegaMine.inject()
        ], Template);
        Shared.Template = Template;
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Template.js.map