import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlHandlingStrategy, UrlTree } from '@angular/router';
import { AppComponent } from './AppComponent';

export class MigrationUrlHandlingStrategy implements UrlHandlingStrategy {
    shouldProcessUrl(url: UrlTree): boolean {
        return url.toString().startsWith("/myapp");
    }
    extract(url: UrlTree): UrlTree { return url; }
    merge(url: UrlTree, whole: UrlTree): UrlTree { return url; }
}

const appRoutes: Routes = [
    { path: 'myapp', component: AppComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            useHash: true,
            initialNavigation: false // we went to trigger navigation outselves after ng1 is done bootstrapping
        })
    ],
    providers: [
        {
            provide: UrlHandlingStrategy,
            useClass: MigrationUrlHandlingStrategy
        }
    ], 
   exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
