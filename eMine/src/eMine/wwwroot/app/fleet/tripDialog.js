'use strict'

angular.module('emine').factory('tripDialog', tripDialog);

fuelDialog.$inject = ['$mdDialog', 'vehicleService', 'utility'];

function tripDialog($mdDialog, vehicleService, utility)
{

    var dialog =
    {
        viewDialog: viewDialog,
        editMode: false,
    };

    return dialog;

    function viewDialog(model, editMode, ev)
    {
        dialog.editMode = editMode;

        $mdDialog.show({
            controller: DialogController,
            controllerAs: "vm",
            templateUrl: utility.virtualDirectory + '/app/fleet/tripDialog.html',
            targetEvent: ev,
            locals: { $mdDialog: $mdDialog, service: vehicleService, model: model, editMode: dialog.editMode }
        })
    }

    function DialogController($scope, $mdDialog, service, model, editMode)
    {
        
        var vm =
        {
            save: save,
            cancel: cancel,
            model: {},
            editMode: editMode,
        }

        init();

        return vm;

        function init()
        {
            angular.extend(vm.model, model);
            angular.extend($scope, vm);
        }

        function cancel()
        {
            event.preventDefault();
            $mdDialog.cancel();
        };

        function save(form)
        {
            if (form.$valid)
            {
                service.saveTrip(vm.model).success(function ()
                {
                    //update the grid values
                    if (vm.model.VehicleTripId === 0)
                    {
                        service.getTripList(vm.model.VehicleId);
                    }
                    else
                    {
                        model.VehicleTripName = vm.model.VehicleTripName
                        model.StartingTime = vm.model.StartingTime
                        model.ReachingTime = vm.model.ReachingTime
                        model.OdometerStart = vm.model.OdometerStart
                        model.OdometerEnd = vm.model.OdometerEnd
                    }

                    $mdDialog.hide();
                });
            }
        };
    }

}
