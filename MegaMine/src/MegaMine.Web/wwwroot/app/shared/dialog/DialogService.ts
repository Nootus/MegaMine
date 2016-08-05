module MegaMine.Shared {

    @service("megamine", "MegaMine.Shared.DialogService")
    @inject("$q", "$mdDialog")
    export class DialogService<TModel> {

        public dialogModel: TModel = <TModel>{};
        public deferred: ng.IDeferred<TModel> = undefined;

        constructor(private $q: ng.IQService, private $mdDialog: ng.material.IDialogService) {
        }


        public show(options: Models.IDialogOptions<TModel>): ng.IPromise<TModel> {
            let self: DialogService<TModel> = this;

            self.deferred = self.$q.defer();

            self.$mdDialog.show({
                controller: DialogController,
                controllerAs: "vm",
                templateUrl: options.templateUrl,
                template: options.template,
                targetEvent: options.targetEvent,
                locals: { dialogOptions: options, deferred: self.deferred, $mdDialog: self.$mdDialog },
                resolve: options.resolve,
                bindToController: true
            });

            return self.deferred.promise;
        }

        public hide(): void {
            this.$mdDialog.hide();
        }

    }

    @inject("$scope")
    class DialogController<TModel> {

        // bind to controller variables
        private dialogOptions: Models.IDialogOptions<TModel>;
        private deferred: ng.IDeferred<TModel>;
        private $mdDialog: ng.material.IDialogService;

        public dialogError: Models.INtException;
        public model: TModel;

        private dialogMode: Models.DialogMode;
        private deferredPromiseState: any = undefined;

        constructor(private $scope: ng.IScope) {
            const self: DialogController<TModel> = this;
            self.initialize();
        }



        private initialize(): void {
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