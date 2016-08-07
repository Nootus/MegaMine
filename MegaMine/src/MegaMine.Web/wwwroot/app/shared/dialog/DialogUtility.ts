module MegaMine.Shared.Dialog {

    @service("megamine", "MegaMine.Shared.DialogUtility")
    @inject("$mdDialog")
    export class DialogUtility {

        constructor(private $mdDialog: ng.material.IDialogService) {
        }

        public alert(title: string, content: string, ev: MouseEvent): void {
            let self: DialogUtility = this;
            self.$mdDialog.show(
                self.$mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title(title)
                    .textContent(content)
                    .ariaLabel(title)
                    .ok("Ok")
                    .targetEvent(ev)
            );
        }

        public confirm(title: string, content: string, ev: MouseEvent): angular.IPromise<any> {
            let self: DialogUtility = this;

            let dialog: ng.material.IConfirmDialog = self.$mdDialog.confirm()
                .parent(angular.element(document.body))
                .title(title)
                .textContent(content)
                .ariaLabel(title)
                .ok("Yes")
                .cancel("No")
                .targetEvent(ev);
            return self.$mdDialog.show(dialog);
        }
    }
}
