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
            let NtDialog_1;
            let NtDialog = NtDialog_1 = class NtDialog {
                constructor($timeout) {
                    this.$timeout = $timeout;
                    // directive attributes
                    this.restrict = "E";
                    this.transclude = {
                        "dialogButtons": "?dialogButtons"
                    };
                    this.scope = {
                        form: "@",
                        header: "@",
                        saveText: "@"
                    };
                    this.link = {
                        pre: this.preLinkFn,
                        post: this.postLinkFn
                    };
                    this.template = this.getTemplate();
                    this.controller = NtDialog_1;
                    this.controllerAs = "$ctrl";
                }
                getTemplate() {
                    return `<form name="{{$ctrl.form}}" novalidate>
                       <nt-toolbar header="{{$ctrl.header}}" class="command-bar dialog">
                         <md-dialog-actions>
                          <span ng-transclude="dialogButtons"></span>
                          <nt-button type="command-bar" icon-css="floppy-o" text="{{$ctrl.saveText}}" ng-click="save(dialogForm)" 
                                ng-show="dialogMode === ${1 /* save */}" 
                                ng-disabled="dialogForm.$invalid && dialogForm.$submitted">
                          </nt-button>
                          <nt-button type="command-bar" icon-css="trash" css-class="delete" text="Delete" 
                                ng-click="deleteItem(dialogForm)" ng-show="dialogMode === ${2 /* delete */}">
                          </nt-button>
                          <nt-button type="command-bar" icon-css="ban" text="Cancel" ng-click="cancel($event)" 
                                ng-show="dialogMode !== ${0 /* view */}" override-disabled="true">
                          </nt-button>
                          <nt-button type="command-bar" icon-css="times" text="Close" ng-click="cancel($event)" 
                                ng-show="dialogMode === ${0 /* view */}" override-disabled="true">
                          </nt-button>
                         </md-dialog-actions>
                       </nt-toolbar>
                       <md-dialog-content class="dialog-content">
                          <div ng-transclude></div>
                       </md-dialog-content>
                   </form>`;
                }
                preLinkFn(scope, element, instanceAttributes, $ctrl) {
                    let self = $ctrl;
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
                postLinkFn(scope, element, instanceAttributes, $ctrl) {
                    let self = $ctrl;
                    scope.dialogForm = scope[scope.form];
                    scope.$parent[scope.form] = scope[scope.form];
                    self.dialogForm = scope.dialogForm;
                    scope.$parent.vm.dialogForm = scope.dialogForm;
                }
            };
            NtDialog = NtDialog_1 = __decorate([
                MegaMine.directive("megamine", "ntDialog"),
                MegaMine.inject()
            ], NtDialog);
            Directives.NtDialog = NtDialog;
        })(Directives = Shared.Directives || (Shared.Directives = {}));
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=NtDialog.js.map