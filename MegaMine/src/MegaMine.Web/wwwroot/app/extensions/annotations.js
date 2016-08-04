var MegaMine;
(function (MegaMine) {
    var Annotations;
    (function (Annotations) {
        "use strict";
        Annotations.MODULE_NANME = "megamine";
        function instantiate(moduleName, name, mode) {
            return (target) => {
                moduleName = moduleName || Annotations.MODULE_NANME;
                name = name || target.name;
                angular.module(moduleName)[mode](name, target);
            };
        }
        function attachInjects(target, ...args) {
            (target.$inject || []).forEach((item, index) => {
                target.prototype[(item.charAt(0) === '$' ? '$' : '$$') + item] = args[index];
            });
            return target;
        }
        Annotations.attachInjects = attachInjects;
        function inject(...args) {
            return (target, key, index) => {
                if (angular.isNumber(index)) {
                    target.$inject = target.$inject || [];
                    target.$inject[index] = args[0];
                }
                else {
                    target.$inject = args;
                }
            };
        }
        Annotations.inject = inject;
        function config(moduleName) {
            return (target) => {
                moduleName = moduleName || Annotations.MODULE_NANME;
                angular.module(moduleName).config(target);
            };
        }
        Annotations.config = config;
        function run(moduleName) {
            return (target) => {
                moduleName = moduleName || Annotations.MODULE_NANME;
                angular.module(moduleName).run(target);
            };
        }
        Annotations.run = run;
        function service(moduleName, serviceName) {
            return instantiate(moduleName, serviceName, 'service');
        }
        Annotations.service = service;
        function controller(moduleName, ctrlName) {
            return instantiate(moduleName, ctrlName, 'controller');
        }
        Annotations.controller = controller;
        function directive(moduleName, directiveName) {
            return (target) => {
                moduleName = moduleName || Annotations.MODULE_NANME;
                directiveName = directiveName || target.name;
                function factory(...args) {
                    //return attachInjects(target, ...args);
                    return new target(...args);
                }
                if (target.$inject && target.$inject.length > 0) {
                    factory.$inject = target.$inject.slice(0);
                }
                angular.module(moduleName).directive(directiveName, factory);
                //let config: angular.IDirective;
                //moduleName = moduleName || MODULE_NANME;
                //directiveName = directiveName || target.name;
                //const ctrlName: string = angular.isString(target.controller) ? target.controller.split(' ').shift() : null;
                //if (ctrlName) {
                //    controller(moduleName, ctrlName)(target);
                //}
                //config = directiveProperties.reduce((
                //    config: angular.IDirective,
                //    property: string
                //) => {
                //    return angular.isDefined(target[property]) ? angular.extend(config, { [property]: target[property] }) :
                //        config;
                //}, { controller: target, scope: Boolean(target.templateUrl) });
                //angular.module(moduleName).directive(directiveName, () => (config));
            };
        }
        Annotations.directive = directive;
        function classFactory(moduleName, className) {
            return (target) => {
                moduleName = moduleName || Annotations.MODULE_NANME;
                className = className || target.name;
                function factory(...args) {
                    //return attachInjects(target, ...args);
                    return new target(...args);
                }
                if (target.$inject && target.$inject.length > 0) {
                    factory.$inject = target.$inject.slice(0);
                }
                angular.module(moduleName).factory(className, factory);
            };
        }
        Annotations.classFactory = classFactory;
    })(Annotations = MegaMine.Annotations || (MegaMine.Annotations = {}));
})(MegaMine || (MegaMine = {}));
var MegaMine;
(function (MegaMine) {
    MegaMine.inject = MegaMine.Annotations.inject;
    MegaMine.config = MegaMine.Annotations.config;
    MegaMine.run = MegaMine.Annotations.run;
    MegaMine.service = MegaMine.Annotations.service;
    MegaMine.controller = MegaMine.Annotations.controller;
    MegaMine.directive = MegaMine.Annotations.directive;
    MegaMine.classFactory = MegaMine.Annotations.classFactory;
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=annotations.js.map