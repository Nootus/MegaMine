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

        constructor(private profile: MegaMine.Shared.Profile) {

        }

        public getTemplate(): string {
            return `<span ng-hide="$ctrl.hideButton === true" >
                        <md-button class="{{$ctrl.cssClass}} {{$ctrl.type}}-button has-hover" 
                                aria-label="{{$ctrl.toolTip}}" ng-click="$ctrl.ntClick($ctrl.form, $event)"
                                ng-disabled="$ctrl.form.$invalid && $ctrl.form.$submitted && $ctrl.bypassDisabled">
                            <md-tooltip ng-style="$ctrl.toolTipStyle">{{$ctrl.toolTip}}</md-tooltip>
                            <md-icon class="fa fa-{{$ctrl.iconCss}} {{$ctrl.type}}-button-icon" aria-label="{{$ctrl.toolTip}}"></md-icon>
                            <div class="{{$ctrl.type}}-button-text">{{$ctrl.text}}</div>
                        </md-button>
                    </span>`;
        }

        public linkFn(scope: INtButtonScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtButton): void {
            const self: NtButton = $ctrl;

            // scope variables
            self.cssClass = scope.cssClass;
            self.type = scope.type;
            self.toolTip = scope.toolTip;
            self.iconCss = scope.iconCss;
            self.text = scope.text;
            self.form = scope.form;

            const icon: string = scope.icon;
            const claim: string = scope.claim;
            const overrideDisabled: string = scope.overrideDisabled;

            if (self.form === undefined) {
                self.form = scope.$parent.$parent.$parent[scope.$parent.$parent.$parent["form"]];
            }

            if (claim === undefined || claim === "") {
                self.hideButton = false;
            } else {
                self.hideButton = !self.profile.isAuthorized(claim.split(","));
            }

            // setting the default values
            self.bypassDisabled = overrideDisabled === "true" ? false : true;
            // hiding the tooltip if not specified
            let hideToolTip: boolean = scope.toolTip === undefined ? true : false;
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

        public ntClick(form: ng.IFormController, ev: ng.IAngularEvent): void {
            if (form !== undefined) {
                form.$setSubmitted();
            }
        }
    }
    interface INtButtonScope extends ng.IScope {
        cssClass: string;
        type: string;
        toolTip: string;
        iconCss: string;
        text: string;
        form: ng.IFormController;
        icon: string;
        claim: string;
        overrideDisabled: string;
    }
}
