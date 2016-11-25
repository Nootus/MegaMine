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
            let NtInput_1;
            let NtInput = NtInput_1 = class NtInput {
                constructor() {
                    // directive attributes
                    this.restrict = "E";
                    this.scope = {
                        ngModel: "=",
                        form: "=?",
                        label: "@",
                        controlName: "@",
                        type: "@",
                        ngRequired: "@",
                        ngDisabled: "@",
                        ngChange: "=?",
                        emMaxlength: "@",
                        style: "@",
                        errorMessages: "=?",
                    };
                    this.link = this.linkFn;
                    this.template = this.getTemplate();
                    this.controller = NtInput_1;
                    this.controllerAs = "$ctrl";
                }
                getTemplate() {
                    return `<md-input-container md-is-error="$ctrl.isFieldError($ctrl.form, $ctrl.controlName)" style="{{$ctrl.style}}" ng-trim="true">
                        <label>{{$ctrl.label}}</label>
                        <input name="{{$ctrl.controlName}}" type="{{$ctrl.type}}" ng-required="$ctrl.isRequired" ng-disabled="$ctrl.isDisabled" md-maxlength="{{$ctrl.emMaxlength}}" ng-model="ngModel" ng-change="ngChange">
                        <div ng-messages="$ctrl.form[$ctrl.controlName].$error" ng-show="$ctrl.isFieldError($ctrl.form, $ctrl.controlName)">
                            <span ng-message="required">Required!</span>
                            <span ng-message="md-maxlength">Text is too long!</span>
                            <span ng-message="number">Invalid number!</span>
                            <span ng-message="date">Invalid date!</span>
                            <span ng-message="datetimelocal">Invalid date!</span>
                            <span ng-repeat="errorMessage in $ctrl.errorMessages">
                                <span ng-message-exp="errorMessage.type">{{ errorMessage.text }}</span>
                            </span>
                        </div>
                    </md-input-container>`;
                }
                linkFn(scope, element, instanceAttributes, $ctrl) {
                    const self = $ctrl;
                    self.form = scope.form;
                    self.label = scope.label;
                    self.controlName = scope.controlName;
                    self.type = scope.type;
                    self.ngRequired = scope.ngRequired;
                    self.ngDisabled = scope.ngDisabled;
                    self.ngChange = scope.ngChange;
                    self.emMaxlength = scope.emMaxlength;
                    self.style = scope.style;
                    self.errorMessages = scope.errorMessages;
                    if (self.form === undefined) {
                        self.form = scope.$parent.$parent[scope.$parent.$parent["form"]];
                    }
                    if (self.type === "date" || self.type === "time" || self.type === "datetime-local") {
                        if (scope.ngModel !== null && scope.ngModel !== undefined) {
                            scope.ngModel = new Date(scope.ngModel);
                        }
                    }
                    if (self.type === undefined)
                        self.type = "text";
                    let dialogMode = scope.$parent.$parent["dialogMode"];
                    if (dialogMode !== undefined) {
                        self.isDisabled = dialogMode !== 1 /* save */;
                    }
                    if (self.ngDisabled === "true") {
                        self.isDisabled = true;
                    }
                    if (self.ngRequired === "true") {
                        self.isRequired = true;
                    }
                }
                isFieldError(form, controlName) {
                    const self = this;
                    if (form !== undefined) {
                        let control = form[self.controlName];
                        return form.$submitted && !control.$valid;
                    }
                }
            };
            NtInput = NtInput_1 = __decorate([
                MegaMine.directive("megamine", "ntInput"),
                MegaMine.inject()
            ], NtInput);
            Directives.NtInput = NtInput;
        })(Directives = Shared.Directives || (Shared.Directives = {}));
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=NtInput.js.map