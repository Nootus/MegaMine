var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Shared;
    (function (Shared) {
        var Directives;
        (function (Directives) {
            let NtChips_1;
            let NtChips = NtChips_1 = class NtChips {
                constructor($timeout) {
                    this.$timeout = $timeout;
                    // directive attributes
                    this.restrict = "E";
                    this.scope = {
                        ngModel: "=",
                        ntItems: "=",
                        ntItemText: "@",
                        ntItemValue: "@",
                        label: "@"
                    };
                    this.link = {
                        pre: this.preLinkFn,
                        post: this.postLinkFn
                    };
                    this.template = this.getTemplate();
                    this.controller = NtChips_1;
                    this.controllerAs = "$ctrl";
                }
                getTemplate() {
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
                preLinkFn(scope, element, instanceAttributes, $ctrl) {
                    const self = $ctrl;
                    self.ngModel = scope.ngModel;
                    self.ntItems = scope.ntItems;
                    self.ntItemText = scope.ntItemText;
                    self.ntItemValue = scope.ntItemValue;
                    self.label = scope.label;
                }
                postLinkFn(scope, element, instanceAttributes, $ctrl) {
                    const self = $ctrl;
                    self.ntItemText = self.ntItemText === undefined ? "item" : self.ntItemText;
                    self.ntItemValue = self.ntItemValue === undefined ? "key" : self.ntItemValue;
                    self.allItems = angular.copy(self.ntItems);
                }
                itemChange(chip, index) {
                    const self = this;
                    self.allItems.splice(0, self.allItems.length);
                    angular.forEach(self.ntItems, function (item) {
                        let push = true;
                        for (let counter = 0; counter < self.ngModel.length; counter++) {
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
                querySearch(query) {
                    const self = this;
                    return query ? self.allItems.filter(self.queryFilter(query, self.ntItemText)) : self.allItems;
                }
                queryFilter(query, ntItemText) {
                    let lowercaseQuery = angular.lowercase(query);
                    return function filterFn(item) {
                        return (item[ntItemText].toLowerCase().indexOf(lowercaseQuery) === 0);
                    };
                }
            };
            NtChips = NtChips_1 = __decorate([
                MegaMine.directive("megamine", "ntMultiSelect"),
                MegaMine.inject()
            ], NtChips);
            Directives.NtChips = NtChips;
        })(Directives = Shared.Directives || (Shared.Directives = {}));
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=NtChips.js.map