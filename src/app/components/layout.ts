import { Component } from '@angular/core';


@Component({
  selector: 'aio-layout',
  template: `
    <div class="main-container">
      
      <ng-content></ng-content>

    </div>
  `,
  styles: [`
  `]
})
export class LayoutComponent { }
