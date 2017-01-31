import { Component } from '@angular/core';

@Component({
    selector: 'root-app',
    template: `
        Root
        <div flex ui-view class="view-content"></div>
    `
})
export class RootComponent { name = 'Angular 2'; }

import { downgradeComponent } from '@angular/upgrade/static';

angular.module('megamine')
    .directive(
    'rootApp',
    downgradeComponent({ component: RootComponent }) as angular.IDirectiveFactory
    );
