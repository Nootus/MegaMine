declare module MegaMine.Account.Models {
    interface IChangePasswordFormController extends ng.IFormController {
        newPassword: ng.INgModelController;
        confirmPassword: ng.INgModelController;
    }
}