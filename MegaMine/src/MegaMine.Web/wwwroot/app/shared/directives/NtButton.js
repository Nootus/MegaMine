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
            let NtButton_1;
            let NtButton = NtButton_1 = class NtButton {
                constructor(profile) {
                    this.profile = profile;
                    // directive attributes
                    this.restrict = "E";
                    this.scope = {
                        cssClass: "@",
                        type: "@",
                        toolTip: "@",
                        iconCss: "@",
                        icon: "@",
                        text: "@",
                        claim: "@",
                        overrideDisabled: "@",
                        form: "=?"
                    };
                    this.link = this.linkFn;
                    this.template = this.getTemplate();
                    this.controller = NtButton_1;
                    this.controllerAs = "$ctrl";
                }
                getTemplate() {
                    return `<span ng-hide="$ctrl.hideButton === true" >
                        <md-button class="{{$ctrl.cssClass}} {{$ctrl.type}}-button has-hover" aria-label="{{$ctrl.toolTip}}" ng-click="$ctrl.ntClick({ev: $event})"
                            ng-disabled="$ctrl.form.$invalid && $ctrl.form.$submitted && $ctrl.bypassDisabled">
                            <md-tooltip ng-style="$ctrl.toolTipStyle">{{$ctrl.toolTip}}</md-tooltip>
                            <md-icon class="fa fa-{{$ctrl.iconCss}} {{$ctrl.type}}-button-icon" aria-label="{{$ctrl.toolTip}}"></md-icon>
                            <div class="{{$ctrl.type}}-button-text">{{$ctrl.text}}</div>
                        </md-button>
                    </span>`;
                }
                linkFn(scope, element, instanceAttributes, $ctrl) {
                    const self = $ctrl;
                    self.$scope = scope;
                    //scope variables
                    const scopeCssClass = "cssClass";
                    const scopeType = "type";
                    const scopeToolTip = "toolTip";
                    const scopeIconCss = "iconCss";
                    const scopeIcon = "icon";
                    const scopeText = "text";
                    const scopeClaim = "claim";
                    const scopeOverrideDisabled = "overrideDisabled";
                    const scopeForm = "form";
                    self.cssClass = scope[scopeCssClass];
                    self.type = scope[scopeType];
                    self.toolTip = scope[scopeToolTip];
                    self.iconCss = scope[scopeIconCss];
                    self.text = scope[scopeText];
                    self.form = scope[scopeForm];
                    const icon = scope[scopeIcon];
                    const claim = scope[scopeClaim];
                    const overrideDisabled = scope[scopeOverrideDisabled];
                    if (self.form === undefined) {
                        self.form = self.$scope.$parent.dialogForm;
                    }
                    if (claim === undefined || claim === "") {
                        self.hideButton = false;
                    }
                    else {
                        self.hideButton = !self.profile.isAuthorized(claim.split(","));
                    }
                    // setting the default values
                    self.bypassDisabled = overrideDisabled === "true" ? false : true;
                    // hiding the tooltip if not specified
                    let hideToolTip = scope[scopeToolTip] === undefined ? true : false;
                    if (hideToolTip) {
                        self.toolTipStyle = {
                            display: "none"
                        };
                    }
                    // icons
                    if (icon !== undefined) {
                        switch (icon) {
                            case "save":
                                self.iconCss = "save";
                                break;
                            case "check":
                                self.iconCss = "check";
                                break;
                            case "update":
                                self.iconCss = "check";
                                break;
                            case "edit":
                                self.iconCss = "pencil";
                                break;
                            case "add":
                                self.iconCss = "plus";
                                break;
                            case "cancel":
                                self.iconCss = "ban";
                                break;
                            case "move":
                                self.iconCss = "truck";
                                break;
                            case "delete":
                                self.iconCss = "trash";
                                break;
                        }
                    }
                }
                ntClick(ev) {
                    const self = this;
                    if (self.form === undefined) {
                        self.form = self.$scope.$parent.dialogForm;
                    }
                    if (self.form != undefined) {
                        self.form.$setSubmitted();
                    }
                }
            };
            NtButton = NtButton_1 = __decorate([
                MegaMine.directive("megamine", "ntButton"),
                MegaMine.inject("MegaMine.Shared.Profile")
            ], NtButton);
            Directives.NtButton = NtButton;
        })(Directives = Shared.Directives || (Shared.Directives = {}));
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=NtButton.js.map