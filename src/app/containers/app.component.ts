import {Component, OnInit} from '@angular/core';
import {NmcService} from "../services/nmc_service"
@Component({
  selector: 'aio-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private ds: NmcService) {
  }

  ngOnInit(): void {

    this.ds.countries().subscribe(
      data => {
        data.map(country => {
          if (country.countryCode == "US") {
            window.localStorage.setItem("countryUs", JSON.stringify(country))
          }
        })
      },
      error => {
        this.ds.showGeneralError(error)
      }
    )

  }


}
