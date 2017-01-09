import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import { UrlHandlingStrategy, UrlTree } from '@angular/router';

import { AppComponent } from './AppComponent';
import { RootComponent } from './RootComponent';

export class MigrationUrlHandlingStrategy implements UrlHandlingStrategy {
    shouldProcessUrl(url: UrlTree): boolean {
        return url.toString().startsWith("/myapp");
    }
    extract(url: UrlTree): UrlTree { return url; }
    merge(url: UrlTree, whole: UrlTree): UrlTree { return url; }
}

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule
    ],
    declarations: [
        AppComponent,
        RootComponent
    ],
    providers: [
        { provide: UrlHandlingStrategy, useClass: MigrationUrlHandlingStrategy }
    ], 
    entryComponents: [
        AppComponent,
        RootComponent
    ]
})
export class AppModule {
    ngDoBootstrap() {
    }
}
