declare module angular.ui {
    interface IState {
        title: string;
        previousState: string;
    }
}

declare module angular {
    interface IWindowService {
        virtualDirectory: string;
        apiGateway: string;
    }
}