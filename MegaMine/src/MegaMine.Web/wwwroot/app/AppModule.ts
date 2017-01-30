import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppComponent } from './AppComponent';
import { UserComponent } from './UserComponent';
import { RootComponent } from './RootComponent';
import { AppRoutingModule } from './AppRoutingModule';

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule,
        AppRoutingModule
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
