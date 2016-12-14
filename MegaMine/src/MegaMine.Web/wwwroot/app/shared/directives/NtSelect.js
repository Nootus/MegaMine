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
            let NtSelect_1;
            let NtSelect = NtSelect_1 = class NtSelect {
                constructor($compile, $timeout) {
                    this.$compile = $compile;
                    this.$timeout = $timeout;
                    // directive attributes
                    this.restrict = "E";
                    this.scope = {
                        ngModel: "=",
                        ntChange: "&",
                        optList: "=?",
                        optValue: "@",
                        optText: "@",
                        form: "=?",
                        label: "@",
                        controlName: "@",
                        ngRequired: "=?",
                        ngDisabled: "@",
                        style: "@",
                        errorMessages: "=?"
                    };
                    this.link = {
                        pre: this.preLinkFn,
                        post: this.postLinkFn
                    };
                    this.controller = NtSelect_1;
                    this.controllerAs = "$ctrl";
                }
                getTemplate(controlName, optValue, optText) {
                    return `<md-input-container class="ntselect {{$ctrl.errorCss}}" 
                            md-is-error="$ctrl.isFieldError($ctrl.form, $ctrl.controlName)" style="{{$ctrl.style}}">
                        <label>{{$ctrl.label}}</label>
                        <md-select name="${controlName}" ng-required="$ctrl.ngRequired" ng-disabled="$ctrl.isDisabled" ng-model="ngModel" 
                                ng-change="$ctrl.change()" aria-label="{{$ctrl.controlName}}"
                                ng-model-options="{ updateOn: \'default blur\', debounce: { default: 500, blur: 0 } }">
                            <md-option ng-value="opt.${optValue}" ng-repeat="opt in optList">{{ opt.${optText} }}</md-option>
                        </md-select>
                        <div ng-messages="$ctrl.form[$ctrl.controlName].$error" ng-show="$ctrl.isFieldError($ctrl.form, $ctrl.controlName)">
                            <span ng-message="required">Required!</span>
                            <span ng-repeat="errorMessage in $ctrl.errorMessages">
                                <span class="md-input-message-animation" ng-message-exp="errorMessage.type">{{ errorMessage.text }}</span>
                            </span>
                        </div>
                    </md-input-container>`;
                }
                preLinkFn(scope, element, instanceAttributes, $ctrl) {
                    const self = $ctrl;
                    self.ntChange = scope.ntChange;
                    self.optValue = scope.optValue;
                    self.optText = scope.optText;
                    self.form = scope.form;
                    self.label = scope.label;
                    self.controlName = scope.controlName;
                    self.ngRequired = scope.ngRequired;
                    self.ngDisabled = scope.ngDisabled;
                    self.style = scope.style;
                    self.errorMessages = scope.errorMessages;
                    self.$scope = scope;
                }
                postLinkFn(scope, element, instanceAttributes, $ctrl) {
                    const self = $ctrl;
                    const frm = "form";
                    if (self.form === undefined) {
                        self.form = scope.$parent.$parent[scope.$parent.$parent[frm]];
                    }
                    self.optValue = self.optValue === undefined ? "key" : self.optValue;
                    self.optText = self.optText === undefined ? "item" : self.optText;
                    self.errorCss = "";
                    // checking the required
                    if (self.$scope.ngModel === 0 && (self.ngRequired === "true" || self.ngRequired === true)) {
                        self.$scope.ngModel = undefined;
                    }
                    if (self.$scope.$parent.$parent.dialogMode !== undefined) {
                        self.isDisabled = self.$scope.$parent.$parent.dialogMode !== 1 /* save */;
                    }
                    if (self.ngDisabled === "true") {
                        self.isDisabled = true;
                    }
                    let elementHtml = self.getTemplate(self.controlName, self.optValue, self.optText);
                    element.html(elementHtml);
                    self.$compile(element.contents())(scope);
                }
                isFieldError(form, controlName) {
                    const self = this;
                    if (form !== undefined) {
                        let control = form[controlName];
                        let isError = form.$submitted && !control.$valid;
                        if (isError) {
                            self.errorCss = "ntselect-invalid";
                        }
                        else {
                            self.errorCss = "";
                        }
                        return isError;
                    }
                }
                change() {
                    const self = this;
                    self.$timeout(function () {
                        self.ntChange();
                    });
                }
            };
            NtSelect = NtSelect_1 = __decorate([
                MegaMine.directive("megamine", "ntSelect"),
                MegaMine.inject("$compile", "$timeout")
            ], NtSelect);
            Directives.NtSelect = NtSelect;
        })(Directives = Shared.Directives || (Shared.Directives = {}));
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=NtSelect.js.map