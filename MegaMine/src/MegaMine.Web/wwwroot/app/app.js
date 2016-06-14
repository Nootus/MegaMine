/// <reference path="../../typings/index.d.ts" />
var MegaMine;
(function (MegaMine) {
    MegaMine.inject = MegaMine.Annotations.inject;
    MegaMine.config = MegaMine.Annotations.config;
    MegaMine.run = MegaMine.Annotations.run;
    MegaMine.service = MegaMine.Annotations.service;
    MegaMine.controller = MegaMine.Annotations.controller;
    MegaMine.directive = MegaMine.Annotations.directive;
    MegaMine.classFactory = MegaMine.Annotations.classFactory;
    angular.module('megamine', ['ngAnimate', 'ngMessages', 'ngMaterial', 'ui.router', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.autoResize', 'ui.grid.exporter', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav', 'ui.grid.validate', 'nvd3', 'gridster']);
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=app.js.map