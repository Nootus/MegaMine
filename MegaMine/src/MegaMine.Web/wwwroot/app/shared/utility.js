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
        "use strict";
        var Utility = (function () {
            function Utility($window, $timeout, toastr, uiGridConstants) {
                this.$window = $window;
                this.$timeout = $timeout;
                this.toastr = toastr;
                this.uiGridConstants = uiGridConstants;
                var self = this;
                self.virtualDirectory = $window.virtualDirectory || "";
            }
            Utility.prototype.routePath = function (path) {
                var self = this;
                return self.virtualDirectory + "/" + path;
            };
            Utility.prototype.getTemplateUrl = function (url) {
                var self = this;
                return self.virtualDirectory + "/app/" + url;
            };
            Utility.prototype.showInfo = function (message) {
                var self = this;
                if (message !== null && message !== "") {
                    self.toastr.info(message);
                }
            };
            Utility.prototype.showError = function (message) {
                var self = this;
                self.toastr.error(message);
            };
            Utility.prototype.getListItem = function (list, key) {
                var item;
                for (var counter = 0; counter < list.length; counter++) {
                    if (key === list[counter].key) {
                        item = list[counter].item;
                        break;
                    }
                }
                return item;
            };
            Utility.prototype.getItem = function (list, key, keyField, itemField) {
                var item;
                for (var counter = 0; counter < list.length; counter++) {
                    if (key === list[counter][keyField]) {
                        item = list[counter][itemField];
                        break;
                    }
                }
                return item;
            };
            Utility.prototype.deleteProperties = function (model) {
                angular.forEach(model, function (value, property) {
                    delete model[property];
                });
            };
            Utility.prototype.isEmpty = function (value) {
                var self = this;
                return self.isUndefined(value) || value === "" || value === null || value !== value;
            };
            ;
            Utility.prototype.isUndefined = function (value) {
                return typeof value === "undefined";
            };
            Utility.prototype.extend = function (dest, source) {
                dest.splice(0, dest.length);
                angular.extend(dest, source);
            };
            Utility.prototype.getContentHeight = function (contentClass, bottomOffset) {
                var self = this;
                var windowHeight = self.$window.innerHeight;
                var contentOffset = angular.element(document.getElementsByClassName(contentClass)[0]).offset();
                if (contentOffset !== undefined) {
                    var contentHeight = windowHeight - (contentOffset.top) - bottomOffset;
                    return contentHeight + "px";
                }
                return undefined;
            };
            Utility = __decorate([
                MegaMine.service("megamine", "MegaMine.Shared.Utility"),
                MegaMine.inject("$window", "$timeout", "toastr", "uiGridConstants")
            ], Utility);
            return Utility;
        }());
        Shared.Utility = Utility;
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Utility.js.map