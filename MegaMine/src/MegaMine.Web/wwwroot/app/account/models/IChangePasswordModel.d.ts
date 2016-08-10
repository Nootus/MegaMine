declare module MegaMine.Account.Models {
    interface IChangePasswordModel {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    }
}