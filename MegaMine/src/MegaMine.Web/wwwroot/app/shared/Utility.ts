module MegaMine.Shared {

    @service("megamine", "MegaMine.Shared.Utility")
    @inject("$window", "$timeout", "toastr", "uiGridConstants")
    export class Utility {

        public virtualDirectory: string;


        constructor(private $window: ng.IWindowService, private $timeout: ng.ITimeoutService
                        , private toastr: any, private uiGridConstants: uiGrid.IUiGridConstants) {
            let self: Utility = this;

            self.virtualDirectory = $window.virtualDirectory || "";
        }

        public routePath(path: string): string {
            let self: Utility = this;

            return self.virtualDirectory + "/" + path;
        }

        public getTemplateUrl(url: string): string {
            let self: Utility = this;

            return self.virtualDirectory + "/app/" + url;
        }

        public showInfo(message: string): void {
            let self: Utility = this;

            if (message !== null && message !== "") {
                self.toastr.info(message);
            }
        }

        public showError(message: string): void {
            let self: Utility = this;

            self.toastr.error(message);
        }

        public getListItem(list: Array<Models.IListItem<number, string>>, key: number): string {
            let item: string;
            for (let counter: number = 0; counter < list.length; counter++) {
                if (key === list[counter].key) {
                    item = list[counter].item;
                    break;
                }
            }

            return item;
        }

        public getItem<T>(list: Array<T>, key: number, keyField: string, itemField: string): T {
            var item: T;
            for (let counter: number = 0; counter < list.length; counter++) {
                if (key === list[counter][keyField]) {
                    item = list[counter][itemField];
                    break;
                }
            }

            return item;
        }

        public deleteProperties<T>(model: T): void {
            angular.forEach(model, function (value: any, property: any): void {
                delete model[property];
            });
        }

        public isEmpty(value: string): boolean {
            let self: Utility = this;

            return self.isUndefined(value) || value === "" || value === null || value !== value;
        };

        public isUndefined(value: string): boolean {
            return typeof value === "undefined";
        }

        public extend<T>(dest: Array<T>, source: Array<T>): void {

            dest.splice(0, dest.length);
            angular.extend(dest, source);
        }

        public getContentHeight(contentClass: string, bottomOffset: number): string {
            let self: Utility = this;

            let windowHeight: number = self.$window.innerHeight;
            let contentOffset: JQueryCoordinates = angular.element(document.getElementsByClassName(contentClass)[0]).offset();
            if (contentOffset !== undefined) {
                let contentHeight: number = windowHeight - (contentOffset.top) - bottomOffset;
                return contentHeight + "px";
            }

            return undefined;
        }


    }
}
