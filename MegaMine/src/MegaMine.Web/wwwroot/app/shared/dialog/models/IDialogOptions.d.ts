declare module MegaMine.Shared.Dialog.Models {
    interface IDialogOptions<TModel> {
        templateUrl: string;
        template?: string;
        targetEvent: any;
        data: IDialogData<TModel>;
        dialogMode: DialogMode;
        resolve?: { [name: string]: any };
        dialogInit?(dialogController: DialogController<TModel>, dialogModel: TModel): void;
        $mdDialog?: ng.material.IDialogService;
    }
}