angular.module("ntRouter", []);
angular.module("ntRouter").config(function ($provide: angular.auto.IProvideService) {

    $provide.decorator('$state', ["$delegate", function ($delegate: ng.ui.IStateService) {

        let $state: any = $delegate;

        // extend go to force reload: true 
        $state.baseGo = $state.go;

        $state.go = (to: string, params?: {}, options?: ng.ui.IStateOptions) => {
            options = options || {};

            // if reload is missing, adding explicitly
            if (angular.isUndefined(options.reload)) {

                options.reload = true;
            }

            // call original go
            $state.baseGo(to, params, options);
        };

        return $delegate;
    }]);
});
