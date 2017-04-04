import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './UserComponent';

const appRoutes: Routes = [
    { path: 'user', component: UserComponent },
    { path: '', redirectTo: '/user', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
   exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
