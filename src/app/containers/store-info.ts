import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {User} from "../models/user";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {NmcService} from "../services/nmc_service";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";

import {HOME_ADDRESS, SHIPPING_ADDRESS, BILLING_ADDRESS} from "../models/dics";
import {
  COMPANY_NAME, TAX_ID_NUMBER, LOCATION_SUBSCR_QTY, ADDRESS_STRUCT,
  MULT_LOCATION_QTY, ADDRESS_TYPE
} from "../models/nmc_fields";

@Component({
  selector: 'aio-store-info',
  styleUrls: ['../css/cards.css'],
  templateUrl: "store-info.html"

})
export class NmcStoreInfoComponent implements OnInit {

  loading: boolean
  storeForm: FormGroup;
  user: User

  addressType = HOME_ADDRESS
  showAddress: boolean = true
  private addrIdx: number;


  ngOnInit(): void {

  }

  constructor(private formBuilder: FormBuilder, private ds: NmcService, private router: Router, private snackBar: MdSnackBar) {

    this.user = JSON.parse(localStorage.getItem('currentUser'))

    this.addrIdx = this.user[ADDRESS_STRUCT].findIndex( addr =>  addr[ADDRESS_TYPE] == this.addressType)

    this.storeForm = formBuilder.group({
      'storeName': [this.user[COMPANY_NAME], [
        Validators.required
      ]],
      'taxId': [this.user[TAX_ID_NUMBER], Validators.required],
      'locationTotal': [this.user[MULT_LOCATION_QTY]]

    });
  }

  onSubmit() {

    this.user[COMPANY_NAME] = this.storeForm.controls['storeName'].value
    this.user[TAX_ID_NUMBER] = this.storeForm.controls['taxId'].value

    let loc = this.storeForm.controls['locationTotal'].value|0
    this.user[MULT_LOCATION_QTY] = loc.toString()

    let addrObject = this.ds.addressAsObject(
      HOME_ADDRESS,
      this.storeForm.controls['addr1'].value,
      this.storeForm.controls['addr2'].value,
      this.storeForm.controls['countryId'].value,
      this.storeForm.controls['stateId'].value,
      this.storeForm.controls['cityId'].value,
      this.storeForm.controls['zipcodeId'].value,
      this.storeForm.controls['phoneNum'].value.toString().replace(/[^0-9\.]/g, ''),
      this.storeForm.controls['phoneExt'].value.toString()
    )

    if (this.addrIdx == -1 )
      this.user[ADDRESS_STRUCT].push(addrObject)
    else
      this.user[ADDRESS_STRUCT][this.addrIdx] = addrObject

    if (this.user[ADDRESS_STRUCT].findIndex( addr =>  addr[ADDRESS_TYPE] == SHIPPING_ADDRESS) == -1) {
      //console.log('add shipping address')
      let shipAdr = Object.assign({}, addrObject)
   //  console.log(shipAdr)
      shipAdr[ADDRESS_TYPE] = SHIPPING_ADDRESS
      this.user[ADDRESS_STRUCT].push(shipAdr)
    }

    if (this.user[ADDRESS_STRUCT].findIndex( addr =>  addr[ADDRESS_TYPE] == BILLING_ADDRESS) == -1) {
    //  console.log('add billing address')
      let billAdr = Object.assign({}, addrObject)
     // console.log(billAdr)
      billAdr[ADDRESS_TYPE] = BILLING_ADDRESS
      this.user[ADDRESS_STRUCT].push(billAdr)
    }

    localStorage.setItem("currentUser", JSON.stringify(this.user))

    this.router.navigate(["/contactInfo"])

  }




}
