'use strict'
angular.module('megamine').factory('changePasswordDialog', changePasswordDialog);
changePasswordDialog.$inject = ['accountService', 'dialogService', "MegaMine.Shared.Utility", "MegaMine.Shared.Constants", 'message'];

function changePasswordDialog(accountService, dialogService, utility, constants, message) {

    var vm =
    {
        model: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        viewDialog: viewDialog,
    };

    return vm;

    function viewDialog(ev) {
        var dialogMode = constants.enum.dialogMode.save;
        var error = { message: undefined,  errors: undefined };
        var validator = {
            passwordErrorMessages: [{ type: 'passsordSame', text: message.samePassword }],
            validatePasswords: validatePasswords
        }

        dialogService.show({
            templateUrl: utility.getTemplateUrl('account/changePasswordDialog.html'),
            targetEvent: ev,
            data: { model: vm.model, validator: validator, error: error },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            accountService.changePassword(dialogModel).then(function (data) {
                dialogService.hide();
            }).catch(function (data) {
                error.message = data.message;
                error.errors = data.model.data;
            });
        });
    }

    function validatePasswords(form) {
        if (form !== undefined) {
            if (form.newPassword.$modelValue !== form.confirmPassword.$modelValue) {
                form.confirmPassword.$setValidity('passsordSame', false);
            }
            else {
                form.confirmPassword.$setValidity('passsordSame', true)
            }
        }
    }
}
