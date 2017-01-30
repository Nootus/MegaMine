import { Component } from '@angular/core';

@Component({
    selector: 'my-user',
    template: `<h1>User: {{name}}</h1>`,
})
export class UserComponent { name = 'Prasanna'; }

import { downgradeComponent } from '@angular/upgrade/static';

angular.module('megamine')
    .directive(
    'myUser',
    downgradeComponent({ component: UserComponent }) as angular.IDirectiveFactory
    );
