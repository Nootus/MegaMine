declare module MegaMine.Shared.Models {
    interface IDataValidator {
        errorMessages: IErrorMessage[];
        validate(form: ng.IFormController): void;
    }
}