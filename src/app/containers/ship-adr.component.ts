import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {User} from "../models/user";
import {NmcService} from "../services/nmc_service";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {ADDRESS_STRUCT, ADDRESS_TYPE} from "../models/nmc_fields";
import {SHIPPING_ADDRESS} from "../models/dics";

@Component({
  selector: 'aio-ship-adr',
  templateUrl: 'ship-adr.component.html'
})
export class ShipAdrComponent implements OnInit {


  shipAdrForm: FormGroup;
  user: User
  countryId: string
  stateId: string
  cityId: string
  zipcodeId: string

  showAddress: boolean = false

  addressType = SHIPPING_ADDRESS
  private addrIdx: number;

  constructor(private formBuilder: FormBuilder, private ds: NmcService, private router: Router, private snackBar: MdSnackBar) {

    this.shipAdrForm = formBuilder.group({
      'new': [false]
    });

  }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser'))
    //console.log(this.user )
    this.addrIdx = this.user[ADDRESS_STRUCT].findIndex(addr => addr[ADDRESS_TYPE] == this.addressType)
  }

  onSubmit() {
    if (this.shipAdrForm.controls['addr1'].value) {
      let addrObject = this.ds.addressAsObject(
        SHIPPING_ADDRESS,
        this.shipAdrForm.controls['addr1'].value,
        this.shipAdrForm.controls['addr2'].value,
        this.shipAdrForm.controls['countryId'].value,
        this.shipAdrForm.controls['stateId'].value,
        this.shipAdrForm.controls['cityId'].value,
        this.shipAdrForm.controls['zipcodeId'].value,
        this.shipAdrForm.controls['phoneNum'].value.toString().replace(/[^0-9\.]/g, ''),
        this.shipAdrForm.controls['phoneExt'].value.toString()
      )

      if (this.addrIdx == -1)
        this.user[ADDRESS_STRUCT].push(addrObject)
      else
        this.user[ADDRESS_STRUCT][this.addrIdx] = addrObject
    }


    localStorage.setItem("currentUser", JSON.stringify(this.user))

   // this.ds.saveUser(this.user).subscribe()
    this.router.navigate(["confirm"])

  }

  onNewAddress() {
    this.showAddress = !this.shipAdrForm.controls['new'].value
  }

  checkValid() {
    //console.log(this.billAdrForm.status == 'VALID'? true: false)
    if (!this.showAddress)
      return false
    else return this.shipAdrForm.status == 'INVALID' ? true : false
  }

}
