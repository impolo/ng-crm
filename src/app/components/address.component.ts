import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NmcService} from "../services/nmc_service";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {Country} from "../models/country";
import {State} from "../models/state";
import {Zipcode} from "../models/zipcode";
import {City} from "../models/city";
import {User} from "../models/user";
import {
  ADDRESS_STRUCT, ADDRESS_TYPE, COUNTRY_ID, STATE_ID, CITY_ID, ZIPCODE_ID, ADDR1,
  ADDR2, ADDRESS_PHONE_NUM, ADDRESS_PHONE_EXT
} from "../models/nmc_fields";

@Component({
  selector: 'aio-address',
  templateUrl: './address.component.html'
})
export class AddressComponent implements OnInit {

  loading: boolean
  user: User
  countries: Country[] = []
  states: State[] = []
  cities: City[] = []
  zipcodes: Zipcode[] = []
  stateNames: any[] = []
  cityNames: any[] = []
  zipcodeNames: any[] = []

  @Input() visible: boolean
  @Input() addressForm: FormGroup
  @Input() addressType: string

  addrIdx: number


  ngOnInit(): void {
    this.loading = true;

    /*

    this.user = JSON.parse(localStorage.getItem('currentUser'))

    this.addrIdx = this.user[ADDRESS_STRUCT].findIndex(addr => addr[ADDRESS_TYPE] == this.addressType)
    //console.log('address index' + this.addrIdx)
   // console.log(this.addressType)
     */
    this.addressForm.addControl('addr1', new FormControl('', Validators.required))
    this.addressForm.addControl('addr2', new FormControl(''))
    this.addressForm.addControl('country', new FormControl('', Validators.required))
    this.addressForm.addControl('state', new FormControl('', Validators.required))
    this.addressForm.addControl('city', new FormControl('', Validators.required))
    this.addressForm.addControl('zipcode', new FormControl('', Validators.required))
    this.addressForm.addControl('countryId', new FormControl(''))
    this.addressForm.addControl('stateId', new FormControl(''))
    this.addressForm.addControl('cityId', new FormControl(''))
    this.addressForm.addControl('zipcodeId', new FormControl(''))
    this.addressForm.addControl('phoneCode', new FormControl(''))
    this.addressForm.addControl('phoneNum', new FormControl(''))
    this.addressForm.addControl('phoneExt', new FormControl(''))


    // this.ds.countries().subscribe(
    //   data => {
    //     data.map(country => {
    //       this.countries.push(country)
    //       if (country.countryCode == "US") {
    //         (<FormControl>this.addressForm.controls['country'])
    //           .setValue(country.countryId, {onlySelf: true})
    //         //and filling state list
    //         this.countries.push(country)
    //         this.addressForm.controls['countryId'].setValue(country.countryId)
    //         this.addressForm.controls['phoneCode'].setValue("+" + country.countryIndicative)
    //
    //         this.changeCountry(this.addressForm.controls['countryId'].value)
    //       }
    //     })
    //     this.loading = false
    //   },
    //   error => {
    //     this.snackBar.open(error)
    //     this.loading = false
    //   }
    // )

    // this.addressForm.controls['phoneNum'].setValue(this.addrIdx == -1 ? '' : this.user[ADDRESS_STRUCT][this.addrIdx][ADDRESS_PHONE_NUM])


  }

  constructor(private formBuilder: FormBuilder, private ds: NmcService, private router: Router, private snackBar: MdSnackBar) {

  }

  changeCountry(value: any) {
    this.loading = true;
    this.states = []
    this.ds.states(value).subscribe(
      data => {
        data.map(state => {
          this.states.push(state)
          if (this.addressForm.controls['stateId'].value == NmcService.pad(state.stateId)) {
            this.addressForm.controls['state'].setValue(state.stateName)
            this.changeState(state.stateName)
          }
        })
        //   data.map(state => this.stateNames.push(state.stateName))
        this.loading = false
      },
      error => {
        this.ds.showGeneralError(error)
        this.loading = false
      }
    )
  }

  changeState(event) {

    this.loading = true;
    this.cities = []
    this.addressForm.controls['stateId'].setValue(this.states.filter(state => state.stateName == event)[0].stateId)
    this.ds.cities(this.addressForm.controls['stateId'].value).subscribe(
      data => {
        data.map(city => {
          this.cities.push(city)
          if (this.addressForm.controls['cityId'].value == NmcService.pad(city.cityId)) {
            this.addressForm.controls['city'].setValue(city.cityName)
            this.changeCity(city.cityName)
          }
        })
        this.loading = false
      },
      error => {
        this.ds.showGeneralError(error)
        this.loading = false
      }
    )

  }

  changeCity(event) {
    this.loading = true;
    this.zipcodes = []
    this.addressForm.controls['cityId'].setValue(this.cities.filter(city => city.cityName == event)[0].cityId)
    this.ds.zipcodes(this.addressForm.controls['cityId'].value).subscribe(
      data => {
        data.map(zipcode => {
          this.zipcodes.push(zipcode)
          if (this.addressForm.controls['zipcodeId'].value == NmcService.pad(zipcode.zipcodeId)) {
            this.addressForm.controls['zipcode'].setValue(zipcode.zipcodeName)
            this.changeZipcode(zipcode.zipcodeName)
          }
        })
        this.loading = false
      },
      error => {
        this.ds.showGeneralError(error)
        this.loading = false
      }
    )
  }

  changeZipcode(event) {
    this.addressForm.controls['zipcodeId'].setValue(this.zipcodes.filter(zipcode => zipcode.zipcodeName == event)[0].zipcodeId)
  }

  searchState(event) {
    this.stateNames = []
    return this.states.map(state => {
      if (state.stateName.toLowerCase().indexOf(event.query.toLowerCase()) == 0)
        this.stateNames.push(state.stateName)
    })
  }

  searchCity(event) {
    this.cityNames = []
    return this.cities.map(city => {
      if (city.cityName.toLowerCase().indexOf(event.query.toLowerCase()) == 0)
        this.cityNames.push(city.cityName)
    })
  }

  searchZipcode(event) {
    this.zipcodeNames = []
    return this.zipcodes.map(zipcode => {
      if (zipcode.zipcodeName.toLowerCase().indexOf(event.query.toLowerCase()) == 0)
        this.zipcodeNames.push(zipcode.zipcodeName)
    })
  }


}
