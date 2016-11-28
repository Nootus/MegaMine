module MegaMine.Shared.Directives {

    @directive("megamine", "ntDialog")
    @inject()
    export class NtDialog implements ng.IDirective {

        // directive attributes
        public restrict: string = "E";
        public transclude: any = {
           "dialogButtons": "?dialogButtons"
        };
        public scope: any = {
            form: "@",
            header: "@",
            saveText: "@"
        };

        public link: ng.IDirectivePrePost = {
            pre: this.preLinkFn,
            post: this.postLinkFn
        };
        public template: string = this.getTemplate();
        public controller: typeof NtDialog = NtDialog;
        public controllerAs: string = "$ctrl";

        // scope variables
        public form: string;
        public header: string;
        public saveText: string;

        public dialogForm: ng.IFormController;

        constructor(private $timeout: ng.ITimeoutService) {

        }

        public getTemplate(): string {
            return `<form name="{{$ctrl.form}}" novalidate>
                   <nt-toolbar header="{{$ctrl.header}}" class="command-bar dialog">
                     <md-dialog-actions>
                      <span ng-transclude="dialogButtons"></span>
                      <nt-button type="command-bar" icon-css="floppy-o" text="{{$ctrl.saveText}}" ng-click="save(dialogForm)" 
                            ng-show="dialogMode === ${ Shared.Dialog.Models.DialogMode.save }" 
                            ng-disabled="dialogForm.$invalid && dialogForm.$submitted">
                      </nt-button>
                      <nt-button type="command-bar" icon-css="trash" css-class="delete" text="Delete" 
                            ng-click="deleteItem(dialogForm)" ng-show="dialogMode === ${ Shared.Dialog.Models.DialogMode.delete }">
                      </nt-button>
                      <nt-button type="command-bar" icon-css="ban" text="Cancel" ng-click="cancel($event)" 
                            ng-show="dialogMode !== ${ Shared.Dialog.Models.DialogMode.view }" override-disabled="true">
                      </nt-button>
                      <nt-button type="command-bar" icon-css="times" text="Close" ng-click="cancel($event)" 
                            ng-show="dialogMode === ${ Shared.Dialog.Models.DialogMode.view }" override-disabled="true">
                      </nt-button>
                     </md-dialog-actions>
                   </nt-toolbar>
                   <md-dialog-content class="dialog-content">
                      <div ng-transclude></div>
                   </md-dialog-content>
               </form>`;
        }

        public preLinkFn(scope: INtDialogScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtDialog): void {
            let self: NtDialog = $ctrl;

            self.form = scope.form;
            self.header = scope.header;
            self.saveText = scope.saveText;

            // interal variables
            if (self.saveText === undefined) {
                self.saveText = "Save";
                }

            angular.extend(scope, {
                dialogMode: scope.$parent.vm.dialogMode,
                save: scope.$parent.vm.save,
                deleteItem: scope.$parent.vm.deleteItem,
                cancel: scope.$parent.vm.cancel
            });
        }

        public postLinkFn(scope: INtDialogScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtDialog): void {
            let self: NtDialog = $ctrl;

            scope.dialogForm = scope[scope.form];
            scope.$parent[scope.form] = scope[scope.form];
            self.dialogForm = scope.dialogForm;
            scope.$parent.vm.dialogForm = scope.dialogForm;
        }
    }

    interface INtDialogScope extends ng.IScope {
        form: string;
        header: string;
        saveText: string;
        dialogForm: ng.IFormController;
        $parent: any;
    }
}
