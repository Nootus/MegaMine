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
        let Utility = class Utility {
            constructor($window, $timeout, toastr, uiGridConstants) {
                this.$window = $window;
                this.$timeout = $timeout;
                this.toastr = toastr;
                this.uiGridConstants = uiGridConstants;
                const self = this;
                self.virtualDirectory = $window.virtualDirectory || "";
            }
            routePath(path) {
                const self = this;
                return self.virtualDirectory + "/" + path;
            }
            getTemplateUrl(url) {
                const self = this;
                return self.virtualDirectory + "/app/" + url;
            }
            showInfo(message) {
                const self = this;
                if (message !== null && message !== "") {
                    self.toastr.info(message);
                }
            }
            showError(message) {
                const self = this;
                self.toastr.error(message);
            }
            getListItem(list, key) {
                let item;
                for (let counter = 0; counter < list.length; counter++) {
                    if (key === list[counter].key) {
                        item = list[counter].item;
                        break;
                    }
                }
                return item;
            }
            getItem(list, key, keyField, itemField) {
                var item;
                for (let counter = 0; counter < list.length; counter++) {
                    if (key === list[counter][keyField]) {
                        item = list[counter][itemField];
                        break;
                    }
                }
                return item;
            }
            deleteProperties(model) {
                angular.forEach(model, function (value, property) {
                    delete model[property];
                });
            }
            isEmpty(value) {
                const self = this;
                return self.isUndefined(value) || value === "" || value === null || value !== value;
            }
            ;
            isUndefined(value) {
                return typeof value === "undefined";
            }
            extend(dest, source) {
                dest.splice(0, dest.length);
                angular.extend(dest, source);
            }
            getContentHeight(contentClass, bottomOffset) {
                const self = this;
                let windowHeight = self.$window.innerHeight;
                let contentOffset = angular.element(document.getElementsByClassName(contentClass)[0]).offset();
                if (contentOffset !== undefined) {
                    let contentHeight = windowHeight - (contentOffset.top) - bottomOffset;
                    return contentHeight + "px";
                }
                return undefined;
            }
        };
        Utility = __decorate([
            MegaMine.service("megamine", "MegaMine.Shared.Utility"),
            MegaMine.inject("$window", "$timeout", "toastr", "uiGridConstants")
        ], Utility);
        Shared.Utility = Utility;
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Utility.js.map