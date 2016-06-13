/// <reference path="../../typings/index.d.ts" />

module MegaMine {
    export const inject: agility.framework.annotations.IInjectAnnotation = agility.framework.annotations.inject;
    export const config: agility.framework.annotations.IConfigAnnotation = agility.framework.annotations.config;
    export const service: agility.framework.annotations.IServiceAnnotation = agility.framework.annotations.service;
    export const controller: agility.framework.annotations.IControllerAnnotation = agility.framework.annotations.controller;
    export const directive: agility.framework.annotations.IDirectiveAnnotation = agility.framework.annotations.directive;
    export const classFactory: agility.framework.annotations.IClassFactoryAnnotation = agility.framework.annotations.classFactory;

    angular.module('megamine', ['ngAnimate', 'ngMessages', 'ngMaterial', 'ui.router', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.autoResize', 'ui.grid.exporter', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav', 'ui.grid.validate', 'nvd3', 'gridster']);
}