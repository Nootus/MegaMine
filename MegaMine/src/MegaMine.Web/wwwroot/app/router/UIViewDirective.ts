export const uiView: ng.IComponentOptions = {
    template: `<ui-view></ui-view>`
}

angular.module("ntRouter").component("ntView", uiView);

import { Directive, ElementRef, Injector } from "@angular/core";
import { UpgradeComponent } from "@angular/upgrade/static";

@Directive({
    selector: "ui-view"
})
export class UIViewDirective extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super("ntView", elementRef, injector);
    }
}
