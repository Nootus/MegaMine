declare module angular {
    interface IWindowService {
        virtualDirectory: string;
        environmentName: string;
        navigation: MegaMine.Shared.Navigation;
        profile: MegaMine.Shared.Profile;
        constants: MegaMine.Shared.Constants;
        d3: any;
    }
}

interface Window {
    toastr: any;
    moment: any;
}
