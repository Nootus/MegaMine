module MegaMine.Shared.Directives {

    @directive("megamine", "ntToolbar")
    @inject("MegaMine.Shared.Utility")
    export class NtToolbar implements ng.IDirective {

        // directive attributes
        public restrict: string = "E";
        public scope: any = {
            header: "@"
        };

        public link: ng.IDirectiveLinkFn = this.linkFn;
        public template: string = this.getTemplate();
        public controller: typeof NtToolbar = NtToolbar;
        public controllerAs: string = "$ctrl";
        public transclude: boolean = true;

        constructor(private utility: MegaMine.Shared.Utility) {

        }

        public getTemplate(): string {
        return `<md-toolbar>
                    <div class="md-toolbar-tools" layout="row">
                    <h2 flex>{{header}}</h2>
                    <div ng-transclude></div>
                    </div>
                </md-toolbar>`;
        }

        public linkFn(scope: ng.IScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtToolbar): void {
            const self: NtToolbar = $ctrl;
            if(self.utility.isEmpty(instanceAttributes["class"])) {
                instanceAttributes.$addClass("command-bar");
            }
        }
    }
}
