module MegaMine.Shared.Directives {

    @directive("megamine", "ntButton")
    @inject("MegaMine.Shared.Profile")
    export class NtButton implements ng.IDirective {

        // directive attributes
        public restrict: string = "E";
        public scope: any = {
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

        public link: ng.IDirectiveLinkFn = this.linkFn;
        public template: string = this.getTemplate();
        public controller: typeof NtButton = NtButton;
        public controllerAs: string = "$ctrl";

        // scope variables
        public cssClass: string;
        public type: string;
        public toolTip: string;
        public iconCss: string;
        public text: string;
        public form: ng.IFormController;

        public hideButton: boolean;
        public bypassDisabled: boolean;
        public toolTipStyle: any;

        private $scope: any;

        constructor(private profile: MegaMine.Shared.Profile) {

        }

        public getTemplate(): string {
            return `<span ng-hide="$ctrl.hideButton === true" >
                        <md-button class="{{$ctrl.cssClass}} {{$ctrl.type}}-button has-hover" aria-label="{{$ctrl.toolTip}}" ng-click="$ctrl.ntClick({ev: $event})"
                            ng-disabled="$ctrl.form.$invalid && $ctrl.form.$submitted && $ctrl.bypassDisabled">
                            <md-tooltip ng-style="$ctrl.toolTipStyle">{{$ctrl.toolTip}}</md-tooltip>
                            <md-icon class="fa fa-{{$ctrl.iconCss}} {{$ctrl.type}}-button-icon" aria-label="{{$ctrl.toolTip}}"></md-icon>
                            <div class="{{$ctrl.type}}-button-text">{{$ctrl.text}}</div>
                        </md-button>
                    </span>`
        }

        public linkFn(scope: ng.IScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtButton): void {
            const self: NtButton = $ctrl;

            self.$scope = scope;

            //scope variables
            const scopeCssClass: string= "cssClass";
            const scopeType: string = "type";
            const scopeToolTip: string = "toolTip";
            const scopeIconCss: string = "iconCss";
            const scopeIcon: string = "icon";
            const scopeText: string = "text";
            const scopeClaim: string = "claim";
            const scopeOverrideDisabled: string = "overrideDisabled";
            const scopeForm: string = "form";

            self.cssClass = scope[scopeCssClass];
            self.type = scope[scopeType];
            self.toolTip = scope[scopeToolTip];
            self.iconCss = scope[scopeIconCss];
            self.text = scope[scopeText];
            self.form = scope[scopeForm];
            const icon: string = scope[scopeIcon];
            const claim: string = scope[scopeClaim];
            const overrideDisabled: string = scope[scopeOverrideDisabled];

            if (claim === undefined || claim === "") {
                self.hideButton = false;
            } else {
                self.hideButton = !self.profile.isAuthorized(claim.split(","));
            }

            // setting the default values
            self.bypassDisabled = overrideDisabled === "true" ? false : true;
            // hiding the tooltip if not specified
            let hideToolTip: boolean = scope[scopeToolTip] === undefined ? true : false;
            if (hideToolTip) {
                self.toolTipStyle = {
                    display: "none"
                };
            }

            // icons
            if (icon !== undefined) {
                switch (icon) {
                    case "save":
                        self.iconCss = "save"
                        break;
                    case "check":
                        self.iconCss = "check"
                        break;
                    case "update":
                        self.iconCss = "check"
                        break;
                    case "edit":
                        self.iconCss = "pencil"
                        break;
                    case "add":
                        self.iconCss = "plus"
                        break;
                    case "cancel":
                        self.iconCss = "ban"
                        break;
                    case "move":
                        self.iconCss = "truck"
                        break;
                    case "delete":
                        self.iconCss = "trash"
                        break;
                }
            }
        }

        public ntClick(ev: ng.IAngularEvent) {
            const self: NtButton = this;

            if (self.form === undefined) {
                self.form = self.$scope.$parent.dialogForm;
            }

            if (self.form != undefined) {
                self.form.$setSubmitted();
            }
        }
    }
}
