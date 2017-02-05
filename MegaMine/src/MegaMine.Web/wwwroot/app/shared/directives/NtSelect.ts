module MegaMine.Shared.Directives {

    @directive("megamine", "ntSelect")
    @inject("$compile", "$timeout")
    export class NtSelect implements ng.IDirective {

        // directive attributes
        public restrict: string = "E";
        public scope: any = {
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

        public link: ng.IDirectivePrePost = {
            pre: this.preLinkFn,
            post: this.postLinkFn
        };
        public controller: typeof NtSelect = NtSelect;
        public controllerAs: string = "$ctrl";

        // scope variables
        public ntChange: any;
        public optValue: string;
        public optText: string;
        public form: ng.IFormController;
        public label: string;
        public controlName: string;
        public ngRequired: any;
        public ngDisabled: string;
        public style: string;
        public errorMessages: MegaMine.Shared.Models.IErrorMessage[];

        public errorCss: string;
        public isDisabled: boolean;

        public $scope: any;

        constructor(private $compile: ng.ICompileService, private $timeout: ng.ITimeoutService) {

        }

        private getTemplate(controlName: string, optValue: string, optText: string): string {
            return `<md-input-container class="ntselect {{$ctrl.errorCss}}" 
                            md-is-error="$ctrl.isFieldError($ctrl.form, $ctrl.controlName)" style="{{$ctrl.style}}">
                        <label>{{$ctrl.label}}</label>
                        <md-select name="${ controlName }" ng-required="$ctrl.ngRequired" ng-disabled="$ctrl.isDisabled" ng-model="ngModel" 
                                ng-change="$ctrl.change()" aria-label="{{$ctrl.controlName}}"
                                ng-model-options="{ updateOn: \'default blur\', debounce: { default: 500, blur: 0 } }">
                            <md-option ng-value="opt.${ optValue }" ng-repeat="opt in optList">{{ opt.${ optText } }}</md-option>
                        </md-select>
                        <div ng-messages="$ctrl.form[$ctrl.controlName].$error" ng-show="$ctrl.isFieldError($ctrl.form, $ctrl.controlName)">
                            <span ng-message="required">Required!</span>
                            <span ng-repeat="errorMessage in $ctrl.errorMessages">
                                <span class="md-input-message-animation" ng-message-exp="errorMessage.type">{{ errorMessage.text }}</span>
                            </span>
                        </div>
                    </md-input-container>`;
        }

        public preLinkFn(scope: INtSelectScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtSelect): void {
            const self: NtSelect = $ctrl;

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

        public postLinkFn(scope: ng.IScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtSelect): void {
            const self: NtSelect = $ctrl;

            const frm: string = "form";

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
                self.isDisabled = self.$scope.$parent.$parent.dialogMode !== Dialog.Models.DialogMode.save;
            }
            if (self.ngDisabled === "true") {
                self.isDisabled = true;
            }


            let elementHtml: string = self.getTemplate(self.controlName, self.optValue, self.optText);
            element.html(elementHtml);
            self.$compile(element.contents())(scope);
        }

        public isFieldError(form: ng.IFormController, controlName: string): boolean {
            const self: NtSelect = this;
            if (form !== undefined) {
                let control: ng.INgModelController = form[controlName];
                let isError: boolean = form.$submitted && !control.$valid;
                if (isError) {
                    self.errorCss = "ntselect-invalid";
                } else {
                    self.errorCss = "";
                }

                return isError;
            }
        }

        public change(): void {
            const self: NtSelect = this;
            self.$timeout(function (): void {
                self.ntChange();
            });
        }
    }

    interface INtSelectScope extends ng.IScope {
        ntChange: any;
        optValue: string;
        optText: string;
        form: ng.IFormController;
        label: string;
        controlName: string;
        ngRequired: any;
        ngDisabled: string;
        style: string;
        errorMessages: MegaMine.Shared.Models.IErrorMessage[];
    }
}
