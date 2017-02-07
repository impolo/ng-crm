import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aio-ok',
  templateUrl: './ok.component.html'
})
export class OkComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.clear()
  }

}
