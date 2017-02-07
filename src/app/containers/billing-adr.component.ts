import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NmcService} from "../services/nmc_service";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {User} from "../models/user";
import {WORK_ADDRESS, BILLING_ADDRESS} from "../models/dics";
import {ADDRESS_TYPE, ADDRESS_STRUCT} from "../models/nmc_fields";

@Component({
  selector: 'aio-billing-adr',
  templateUrl: 'billing-adr.component.html'
})
export class BillingAdrComponent implements OnInit {

  billAdrForm: FormGroup;
  user: User
  countryId: string
  stateId: string
  cityId: string
  zipcodeId: string

  showAddress: boolean = false

  addressType = BILLING_ADDRESS
  private addrIdx: number;

  constructor(private formBuilder: FormBuilder, private ds: NmcService, private router: Router, private snackBar: MdSnackBar) {
    this.billAdrForm = formBuilder.group({
      'new': [false]
    });

  }

  ngOnInit() {
    //console.log(this.showAddress )
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    this.addrIdx = this.user[ADDRESS_STRUCT].findIndex(addr => addr[ADDRESS_TYPE] == this.addressType)
  }

  onSubmit() {
    if (this.billAdrForm.controls['addr1'].value) {
      let addrObject = this.ds.addressAsObject(
        BILLING_ADDRESS,
        this.billAdrForm.controls['addr1'].value,
        this.billAdrForm.controls['addr2'].value,
        this.billAdrForm.controls['countryId'].value,
        this.billAdrForm.controls['stateId'].value,
        this.billAdrForm.controls['cityId'].value,
        this.billAdrForm.controls['zipcodeId'].value,
        this.billAdrForm.controls['phoneNum'].value.toString().replace(/[^0-9\.]/g, ''),
        this.billAdrForm.controls['phoneExt'].value.toString()
      )

      if (this.addrIdx == -1)
        this.user[ADDRESS_STRUCT].push(addrObject)
      else
        this.user[ADDRESS_STRUCT][this.addrIdx] = addrObject
    }


    localStorage.setItem("currentUser", JSON.stringify(this.user))
    this.router.navigate(["shipAdr"])

  }

  onNewAddress() {
    this.showAddress = !this.billAdrForm.controls['new'].value
   // console.log(this.showAddress)
  }

  checkValid() {
    //console.log(this.billAdrForm.status == 'VALID'? true: false)
    if (!this.showAddress)
      return false
    else return this.billAdrForm.status == 'INVALID' ? true : false
  }

}
