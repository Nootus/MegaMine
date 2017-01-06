import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppComponent } from './AppComponent';

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule
    ],
    declarations: [
        AppComponent
    ],
    entryComponents: [
        AppComponent
    ]
})
export class AppModule {
    ngDoBootstrap() { }
}
