declare module MegaMine.Shared.Dialog.Models {
    interface IDialogOptions<TModel> {
        templateUrl: string;
        template?: string;
        targetEvent: any;
        data: IDialogData<TModel>;
        dialogMode: DialogMode;
        resolve?: { [index: string]: angular.IPromise<any> };
        dialogInit?(dialogScope: ng.IScope, dialogModel: TModel): void;
        $mdDialog?: ng.material.IDialogService;
    }
}