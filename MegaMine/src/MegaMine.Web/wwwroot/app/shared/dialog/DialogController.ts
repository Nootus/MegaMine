module MegaMine.Shared.Dialog {
    @controller("megamine", "MegaMine.Shared.Dialog.DialogController")
    @inject("$scope", "$mdDialog", "dialogOptions", "deferred")
    export class DialogController<TModel> {

        // bind to controller variables
        public dialogOptions: Models.IDialogOptions<TModel>;
        public deferred: ng.IDeferred<TModel>;
        public $mdDialog: ng.material.IDialogService;

        // local variables
        public dialogError: Shared.Models.INtException;
        public model: TModel;

        private dialogMode: Models.DialogMode;
        private deferredPromiseState: any = undefined;

        constructor(private $scope: ng.IScope, $mdDialog: ng.material.IDialogService,
            dialogOptions: Models.IDialogOptions<TModel>, deferred: ng.IDeferred<TModel>) {
            const self: DialogController<TModel> = this;

            // todo: due to the bug in material setting the bindToController values and calling $onInit
            self.$mdDialog = $mdDialog;
            self.dialogOptions = dialogOptions;
            self.deferred = deferred;
            self.$onInit();
        }



        public $onInit(): void {
            const self: DialogController<TModel> = this;

            self.dialogMode = self.dialogOptions.dialogMode;
            self.dialogError = self.dialogOptions.data.error;


            // cloning the model & setting the additional data properties
            angular.extend(self, self.dialogOptions.data);
            if (self.dialogOptions.data.model !== undefined) {
                self.model = angular.copy(self.dialogOptions.data.model);
            }

            if (self.dialogOptions.dialogInit !== undefined) {
                self.dialogOptions.dialogInit(self.$scope, self.model);
            }
        }

        public cancel = (ev: ng.IAngularEvent): void => {
            const self: DialogController<TModel> = this;

            ev.preventDefault();
            self.$mdDialog.cancel();
        };

        public save = (form: ng.IFormController): void => {
            this.resolveDialog(form);
        };

        public deleteItem = (form: ng.IFormController): void => {
            this.resolveDialog(form);
        };

        private resolveDialog(form: ng.IFormController): void {
            const self: DialogController<TModel> = this;

            if (form.$valid) {
                if (self.deferredPromiseState === undefined) {
                    self.deferredPromiseState = angular.copy(self.deferred.promise.$$state);
                }
                angular.extend(self.deferred.promise.$$state, self.deferredPromiseState);
                self.deferred.resolve(self.model);
            }
        }
    }
}