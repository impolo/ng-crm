import {Component, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'aio-toolbar',
  template: `
 
    <header class="header header-4">        
        <div class="branding">   
               <img src="../assets/logo.png" />
          <span class="title">
             <ng-content></ng-content>
          </span>
        </div>
    </header>
  `
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
}
