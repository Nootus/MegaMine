import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './UserComponent';

const appRoutes: Routes = [
    { path: 'user', component: UserComponent },
    { path: '', redirectTo: '/user', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes
            , {
                useHash: false,
                initialNavigation: true // we went to trigger navigation outselves after ng1 is done bootstrapping
            })
    ],
   exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }

/*
            , {
            useHash: true,
            initialNavigation: true // we went to trigger navigation outselves after ng1 is done bootstrapping
            }
*/
