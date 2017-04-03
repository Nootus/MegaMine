import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, UrlHandlingStrategy } from "@angular/router";

import { NtRouterComponent } from "./NtRouterComponent";
import { RouterLinkComponent } from "./RouterLinkComponent";
import { UIViewDirective } from "./UIViewDirective";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        NtRouterComponent,
        RouterLinkComponent,
        UIViewDirective
    ],
    exports: [
        NtRouterComponent,
        RouterLinkComponent,
        UIViewDirective
    ],
    providers: [
        { provide: '$state', useFactory: (i: any) => i.get('$state'), deps: ['$injector'] }
    ],
    entryComponents: [
        NtRouterComponent,
        RouterLinkComponent
    ]
})
export class NtRouterModule {
}
