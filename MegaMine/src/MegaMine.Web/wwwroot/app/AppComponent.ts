import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `Hello {{name}} 

<a routerLink="/contact" routerLinkActive="active">Contact</a>
<a routerLink="/user" routerLinkActive="active">User</a>
<br />
<br> <router-outlet></router-outlet>
Good
`
})
export class AppComponent  { name = 'Angular 2'; }

import { downgradeComponent } from '@angular/upgrade/static';

angular.module('megamine')
  .directive(
    'myApp',
    downgradeComponent({ component: AppComponent}) as angular.IDirectiveFactory
);
  