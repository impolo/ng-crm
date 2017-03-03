import {Component, OnInit} from '@angular/core';
import {NmcService} from "../services/nmc_service"
@Component({
  selector: 'aio-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    /*
     this.ds.getParams()
     .subscribe(
     (data) => console.log(data))
     */
  }


}
