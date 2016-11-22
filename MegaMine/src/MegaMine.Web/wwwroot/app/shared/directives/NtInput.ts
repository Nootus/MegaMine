module MegaMine.Shared.Directives {

    @directive("megamine", "ntInput")
    @inject()
    export class NtInput implements ng.IDirective {

        // directive attributes
        public restrict: string = "E";
        public scope: any = {
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

        public link: ng.IDirectiveLinkFn = this.linkFn;
        public template: string = this.getTemplate();
        public controller: typeof NtInput = NtInput;
        public controllerAs: string = "$ctrl";

        // scope variables
        public form: ng.IFormController;
        public label: string;
        public controlName: string;
        public type: string;
        public ngRequired: string;
        public ngDisabled: string;
        public ngChange: any;
        public emMaxlength: number;
        public style: string;
        public errorMessages: Models.IErrorMessage[]

        public isRequired: boolean;
        public isDisabled: boolean;
        private $scope: any;

        public getTemplate(): string {
            return `<md-input-container md-is-error="$ctrl.isFieldError()" style="{{$ctrl.style}}" ng-trim="true">
                        <label>{{$ctrl.label}}</label>
                        <input name="{{$ctrl.controlName}}" type="{{$ctrl.type}}" ng-required="$ctrl.isRequired" ng-disabled="$ctrl.isDisabled" md-maxlength="{{$ctrl.emMaxlength}}" ng-model="ngModel" ng-change="$ctrl.ngChange">
                        <div ng-messages="$ctrl.form[$ctrl.controlName].$error" ng-show="$ctrl.isFieldError()">
                            <span ng-message="required">Required!</span>
                            <span ng-message="md-maxlength">Text is too long!</span>
                            <span ng-message="number">Invalid number!</span>
                            <span ng-message="date">Invalid date!</span>
                            <span ng-message="datetimelocal">Invalid date!</span>
                            <span ng-repeat="errorMessage in $ctrl.errorMessages">
                                <span ng-message-exp="errorMessage.type">{{ errorMessage.text }}</span>
                            </span>
                        </div>
                    </md-input-container>`
        }

        public linkFn(scope: ng.IScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtInput): void {
            const self: NtInput = $ctrl;

            const scopeForm: string = "form";
            const scopeLabel: string = "label";
            const scopeControlName: string = "controlName";
            const scopeType: string = "type";
            const scopeNgRequired: string = "ngRequired";
            const scopeNgDisabled: string = "ngDisabled";
            const scopeNgChange: string = "ngChange";
            const scopeEmMaxlength: string = "emMaxlength";
            const scopeStyle: string = "style";
            const scopeErrorMessages: string = "errorMessages";

            self.$scope = scope;
            self.form = scope[scopeForm];
            self.label = scope[scopeLabel];
            self.controlName = scope[scopeControlName];
            self.type = scope[scopeType];
            self.ngRequired = scope[scopeNgRequired];
            self.ngDisabled = scope[scopeNgDisabled];
            self.ngChange = scope[scopeNgChange];
            self.emMaxlength = scope[scopeEmMaxlength];
            self.style = scope[scopeStyle];
            self.errorMessages = scope[scopeErrorMessages];

            if (self.type === "date" || self.type === "time" || self.type === "datetime-local") {
                if (self.$scope.ngModel !== null && self.$scope.ngModel !== undefined) {
                    self.$scope.ngModel = new Date(self.$scope.ngModel);
                }
            }

            if (self.type === undefined)
                self.type = "text";
            if (self.$scope.$parent.dialogMode !== undefined) {
                self.isDisabled = self.$scope.$parent.dialogMode !== Dialog.Models.DialogMode.save;
            }

            if (self.ngDisabled === "true") {
                self.isDisabled = true;
            }

            if (self.ngRequired === "true") {
                self.isRequired = true;
            }
        }

        public isFieldError(): boolean {
            const self: NtInput = this;
            if (self.form === undefined) {
                self.form = self.$scope.$parent.$parent.dialogForm;
            }
            if (self.form !== undefined) {
                let control: ng.INgModelController = self.form[self.controlName];
                return self.form.$submitted && !control.$valid;
            }
        }
    }
}
