import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'aio-back-button',
  template: `
          <button class="btn btn-primary" (click)="onSubmit()">Back</button>
  `
})
export class BackButtonComponent implements OnInit {

  @Input() rout

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  onSubmit() {
   // console.log(this.rout)
    this.router.navigate([this.rout])
  }

}
