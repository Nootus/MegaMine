module MegaMine.Widget {

    @directive("megamine", "ntAccordion")
    export class NtAccordion implements ng.IDirective {

        // directive attributes
        public priority: number = 100;
        public compile: ng.IDirectiveCompileFn = this.compileFn;

        public compileFn(element: ng.IAugmentedJQuery, templateAttributes: ng.IAttributes, transclude: ng.ITranscludeFunction):
                                            ng.IDirectiveLinkFn {
            const self: NtAccordion = this;

            let id: string = self.getId(templateAttributes);

            element.addClass("accordion");

            let options: JQuery = element.children("li").addClass("item");

            // for children set the class and ng events events
            let item: HTMLElement = options[0];
            angular.element(item).children("h3")
                .addClass("header")
                .attr("ng-click", id + "_toggle($index)")
                .attr("ng-class", id + "_data.current === $index ? \"expand\" : \"collapse\"");


            angular.element(item).children("div")
                .addClass("content slideUp")
                .attr("ng-show", id + "_data.current === $index");


            return self.linkFn;
        }

        public linkFn(scope: ng.IScope, element: ng.IAugmentedJQuery,
            instanceAttributes: ng.IAttributes, $ctrl: NtAccordion): void {
            const self: NtAccordion = this;

            let id: string = self.getId(instanceAttributes);
            let data: any = {
                current: -1
            };

            scope.$parent[id + "_data"] = data;
            scope.$parent[id + "_toggle"] = function (index: number): void {
                data.current = data.current === index ? -1 : index;
            };
        }

        private getId(attrs: ng.IAttributes): string {
            const defaultId: string = "ntAccordion";
            return attrs[defaultId] || "accordion";
        }
    }
}

