module MegaMine.Shared.Directives {

    @directive("megamine", "ntMultiSelect")
    @inject()
    export class NtChips implements ng.IDirective {

        // directive attributes
        public restrict: string = "E";
        public scope: any = {
            ngModel: "=",
            ntItems: "=",
            ntItemText: "@",
            ntItemValue: "@",
            label: "@"
        };

        public link: ng.IDirectivePrePost = {
            pre: this.preLinkFn,
            post: this.postLinkFn
        };
        public template: string = this.getTemplate();
        public controller: typeof NtChips = NtChips;
        public controllerAs: string = "$ctrl";

        // scope variables
        public ngModel: any;
        public ntItems: any[];
        public ntItemText: string;
        public ntItemValue: string;
        public label: string;

        public allItems: any[];

        constructor(private $timeout: ng.ITimeoutService) {

        }

        public getTemplate(): string {
            return `<label class="label_header">{{$ctrl.label}}</label>
                    <md-chips ng-model="ngModel" md-require-match="true" md-on-remove="$ctrl.itemChange($chip, $index)" 
                        md-on-add="$ctrl.itemChange($chip, $index)">
                        <md-autocomplete md-search-text="searchText" md-items="item in $ctrl.querySearch(searchText)" md-min-length="0">
                            <md-item-template>
                                <span>{{item[$ctrl.ntItemText]}}</span>
                            </md-item-template>
                        </md-autocomplete>
                        <md-chip-template>
                            <span>{{$chip[$ctrl.ntItemText]}}</span>
                        </md-chip-template>
                    </md-chips>`;
        }

        public preLinkFn(scope: INtChipsScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtChips): void {
            const self: NtChips = $ctrl;

            self.ngModel = scope.ngModel;
            self.ntItems = scope.ntItems;
            self.ntItemText = scope.ntItemText;
            self.ntItemValue = scope.ntItemValue;
            self.label = scope.label;
        }

        public postLinkFn(scope: ng.IScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtChips): void {
            const self: NtChips = $ctrl;

            self.ntItemText = self.ntItemText === undefined ? "item" : self.ntItemText;
            self.ntItemValue = self.ntItemValue === undefined ? "key" : self.ntItemValue;

            self.allItems = angular.copy(self.ntItems);
        }

        public itemChange(chip: any, index: number): void {
            const self: NtChips = this;

            self.allItems.splice(0, self.allItems.length);
            angular.forEach(self.ntItems, function (item: any): void {
                let push: boolean = true;
                for (let counter: number = 0; counter < self.ngModel.length; counter++) {
                    if (item[self.ntItemValue] === self.ngModel[counter][self.ntItemValue]) {
                        push = false;
                        break;
                    }
                }
                if (push) {
                    self.allItems.push(item);
                }
            });
        }

        public querySearch(query: string): any[] {
            const self: NtChips = this;
            return query ? self.allItems.filter(self.queryFilter(query, self.ntItemText)) : self.allItems;
        }

        private queryFilter(query: string, ntItemText: string): (item: any) => boolean {
            let lowercaseQuery: string = angular.lowercase(query);
            return function filterFn(item: any[]): boolean {
                return (item[ntItemText].toLowerCase().indexOf(lowercaseQuery) === 0);
            };
        }
    }

    interface INtChipsScope extends ng.IScope {
        ngModel: any;
        ntItems: any[];
        ntItemText: string;
        ntItemValue: string;
        label: string;
    }
}
