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

        public link: ng.IDirectivePrePost = {
            pre: this.preLinkFn,
            post: this.postLinkFn
        };
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

        // additional scope variables
        public hideButton: boolean;
        public bypassDisabled: boolean;
        public toolTipStyle: any;
        public showToolTip: boolean;

        // local variables
        private icon: string;
        private claim: string;
        private overrideDisabled: string;

        constructor(private profile: MegaMine.Shared.Profile) {

        }

        public getTemplate(): string {
            return `<span ng-hide="$ctrl.hideButton === true" >
                        <md-button class="{{$ctrl.cssClass}} {{$ctrl.type}}-button has-hover" 
                                aria-label="{{$ctrl.toolTip}}" ng-click="$ctrl.ntClick($ctrl.form, $event)"
                                ng-disabled="$ctrl.form.$invalid && $ctrl.form.$submitted && $ctrl.bypassDisabled">
                            <md-tooltip md-visible="$ctrl.showToolTip">{{$ctrl.toolTip}}</md-tooltip>
                            <md-icon class="fa fa-{{$ctrl.iconCss}} {{$ctrl.type}}-button-icon" aria-label="{{$ctrl.toolTip}}"></md-icon>
                            <div class="{{$ctrl.type}}-button-text">{{$ctrl.text}}</div>
                        </md-button>
                    </span>`;
        }

        public preLinkFn(scope: INtButtonScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtButton): void {
            const self: NtButton = $ctrl;

            // scope variables
            self.cssClass = scope.cssClass;
            self.type = scope.type;
            self.toolTip = scope.toolTip === undefined ? scope.text : scope.toolTip;
            self.iconCss = scope.iconCss;
            self.text = scope.text;
            self.form = scope.form;

            // private variables
            self.icon = scope.icon;
            self.claim = scope.claim;
            self.overrideDisabled = scope.overrideDisabled;
            self.showToolTip = scope.toolTip === undefined ? false : true;
        }

        public postLinkFn(scope: INtButtonScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtButton): void {
            const self: NtButton = $ctrl;

            if (self.form === undefined) {
                const frm: string = "form";
                self.form = scope.$parent.$parent.$parent[scope.$parent.$parent.$parent[frm]];
            }

            if (self.claim === undefined || self.claim === "") {
                self.hideButton = false;
            } else {
                self.hideButton = !self.profile.isAuthorized(self.claim.split(","));
            }

            // setting the default values
            self.bypassDisabled = self.overrideDisabled === "true" ? false : true;

            // hiding the tooltip if not specified
            if (!self.showToolTip) {
                self.toolTipStyle = {
                    display: "none"
                };
            }

            // icons
            if (self.icon !== undefined) {
                switch (self.icon) {
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
