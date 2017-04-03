import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import { NtRouterModule } from './router/NtRouterModule';


import { AppComponent } from './AppComponent';
import { UserComponent } from './UserComponent';
import { RootComponent } from './RootComponent';
import { AppRoutingModule } from './AppRoutingModule';

import "./RxjsOperators";
import "hammerjs";

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule,
        AppRoutingModule,
        NtRouterModule
    ],
    declarations: [
        AppComponent,
        RootComponent,
        UserComponent
    ],
    entryComponents: [
        AppComponent,
        RootComponent,
        UserComponent
    ]
})
export class AppModule {
    ngDoBootstrap() {
    }
}
