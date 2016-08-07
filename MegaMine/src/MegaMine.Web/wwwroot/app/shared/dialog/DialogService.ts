module MegaMine.Shared.Dialog {

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

}