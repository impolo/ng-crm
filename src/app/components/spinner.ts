import {Component, Output, EventEmitter, Input} from '@angular/core';


@Component({
  selector: 'aio-spinner',
  template: `
    <span class="spinner spinner-md" *ngIf=visible ></span>
  `,
  inputs:['visible']
})
export class SpinnerComponent {
}
