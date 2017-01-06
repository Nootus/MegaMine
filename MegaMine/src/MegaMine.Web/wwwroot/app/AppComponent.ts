import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
    template: "Hello"
})
export class AppComponent  { name = 'Angular 2'; }

import { downgradeComponent } from '@angular/upgrade/static';

angular.module('megamine')
  .directive(
    'myApp',
    downgradeComponent({ component: AppComponent}) as angular.IDirectiveFactory
);
  