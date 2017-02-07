import {Component, OnInit} from '@angular/core';
import {NmcService} from "../services/nmc_service"
@Component({
  selector: 'aio-app',
  template: `<aio-layout>
                <aio-toolbar>
                    CRM
                </aio-toolbar>
                <router-outlet></router-outlet>
              </aio-layout>`
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
