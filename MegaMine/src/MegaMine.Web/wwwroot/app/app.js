/// <reference path="../../typings/index.d.ts" />
var MegaMine;
(function (MegaMine) {
    MegaMine.inject = agility.framework.annotations.inject;
    MegaMine.config = agility.framework.annotations.config;
    MegaMine.service = agility.framework.annotations.service;
    MegaMine.controller = agility.framework.annotations.controller;
    MegaMine.directive = agility.framework.annotations.directive;
    MegaMine.classFactory = agility.framework.annotations.classFactory;
    angular.module('megamine', ['ngAnimate', 'ngMessages', 'ngMaterial', 'ui.router', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.autoResize', 'ui.grid.exporter', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav', 'ui.grid.validate', 'nvd3', 'gridster']);
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=app.js.map