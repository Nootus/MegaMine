var MegaMine;
(function (MegaMine) {
    var Annotations;
    (function (Annotations) {
        Annotations.MODULE_NANME = 'microeforms';
        var directiveProperties = [
            'compile',
            'controller',
            'controllerAs',
            'bindToController',
            'link',
            'priority',
            'replace',
            'require',
            'restrict',
            'scope',
            'template',
            'templateUrl',
            'terminal',
            'transclude'
        ];
        function instantiate(moduleName, name, mode) {
            return function (target) {
                moduleName = moduleName || Annotations.MODULE_NANME;
                name = name || target.name;
                angular.module(moduleName)[mode](name, target);
            };
        }
        function attachInjects(target) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            (target.$inject || []).forEach(function (item, index) {
                target.prototype[(item.charAt(0) === '$' ? '$' : '$$') + item] = args[index];
            });
            return target;
        }
        Annotations.attachInjects = attachInjects;
        function inject() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return function (target, key, index) {
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
            return function (target) {
                moduleName = moduleName || Annotations.MODULE_NANME;
                angular.module(moduleName).config(target);
            };
        }
        Annotations.config = config;
        function run(moduleName) {
            return function (target) {
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
            return function (target) {
                var config;
                moduleName = moduleName || Annotations.MODULE_NANME;
                directiveName = directiveName || target.name;
                var ctrlName = angular.isString(target.controller) ? target.controller.split(' ').shift() : null;
                if (ctrlName) {
                    controller(moduleName, ctrlName)(target);
                }
                config = directiveProperties.reduce(function (config, property) {
                    return angular.isDefined(target[property]) ? angular.extend(config, (_a = {}, _a[property] = target[property], _a)) :
                        config;
                    var _a;
                }, { controller: target, scope: Boolean(target.templateUrl) });
                angular.module(moduleName).directive(directiveName, function () { return (config); });
            };
        }
        Annotations.directive = directive;
        function classFactory(moduleName, className) {
            return function (target) {
                moduleName = moduleName || Annotations.MODULE_NANME;
                className = className || target.name;
                function factory() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    //return attachInjects(target, ...args);
                    return new (target.bind.apply(target, [void 0].concat(args)))();
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
//# sourceMappingURL=annotations.js.map