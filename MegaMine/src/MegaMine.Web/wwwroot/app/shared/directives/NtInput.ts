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

        public getTemplate(): string {
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
                    </md-input-container>`
        }

        public linkFn(scope: INtInputScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtInput): void {
            const self: NtInput = $ctrl;

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

            let dialogMode: Dialog.Models.DialogMode = scope.$parent.$parent["dialogMode"];
            if (dialogMode !== undefined) {
                self.isDisabled = dialogMode !== Dialog.Models.DialogMode.save;
            }

            if (self.ngDisabled === "true") {
                self.isDisabled = true;
            }

            if (self.ngRequired === "true") {
                self.isRequired = true;
            }
        }

        public isFieldError(form: ng.IFormController, controlName: string): boolean {
            const self: NtInput = this;
            if (form !== undefined) {
                let control: ng.INgModelController = form[self.controlName];
                return form.$submitted && !control.$valid;
            }
        }
    }

    interface INtInputScope extends ng.IScope {
        ngModel: any;
        form: ng.IFormController;
        label: string;
        controlName: string;
        type: string;
        ngRequired: string;
        ngDisabled: string;
        ngChange: any;
        emMaxlength: number;
        style: string;
        errorMessages: Models.IErrorMessage[]
    }
}
