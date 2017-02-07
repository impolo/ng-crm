import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {NmcService} from "../services/nmc_service";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {User} from "../models/user";
import {
  TOTAL_AMOUNT, TV_PLAYERS_QTY, ONLINE_SUBSCR_QTY, LOCATION_SUBSCR_QTY, CREDIT_CARD,
  CARD_ACCOUNT_NUMBER, CARD_TYPE, CARD_NICK_NAME, CARD_HOLDER_NAME, CARD_CVV, CARD_EXPIRATION_DATE, CARD_TOKEN
} from "../models/nmc_fields";

@Component({
  selector: 'aio-purchasing',
  templateUrl: './purchasing.component.html'
})
export class PurchasingComponent implements OnInit {

  loading: boolean
  purchForm: FormGroup;
  user: User

  locationPrice: number
  tvAdPrice: number
  onlinePrice: number
  totalPrice: number
  taxes: number
  totalWithTaxes: number

  constructor(private formBuilder: FormBuilder, private ds: NmcService, private router: Router, private snackBar: MdSnackBar) {
    this.user = JSON.parse(localStorage.getItem('currentUser'))

    this.purchForm = formBuilder.group({
      'tvplayersQty': [''],
      'locQty': [''],
      'onlineQty': [''],
      'nameOnAccount': ['', Validators.required],
      'accountNumber': ['', Validators.required],
      'expDateMM': ['', Validators.required],
      'expDateYYYY': ['', Validators.required],
      'cvv': ['', Validators.required]
    });
  }

  ngOnInit() {
    // TODO: get price list and setup from backend
    this.purchForm.controls["tvplayersQty"]
      .valueChanges
      .debounceTime(200)
      .subscribe(value => {
        this.calculatePrice("tvplayersQty", value)
      })

    this.purchForm.controls["locQty"]
      .valueChanges
      .debounceTime(200)
      .subscribe(value => {
        this.calculatePrice("locQty", value)
      })

    this.purchForm.controls["onlineQty"]
      .valueChanges
      .debounceTime(200)
      .subscribe(value => {
        this.calculatePrice("onlineQty", value)
      })

    this.purchForm.controls["tvplayersQty"].setValue(this.user[TV_PLAYERS_QTY])
    this.purchForm.controls["locQty"].setValue(this.user[LOCATION_SUBSCR_QTY])
    this.purchForm.controls["onlineQty"].setValue(this.user[ONLINE_SUBSCR_QTY])

    this.purchForm.controls["accountNumber"].setValue(this.user[CREDIT_CARD][CARD_TOKEN])
    this.purchForm.controls["nameOnAccount"].setValue(this.user[CREDIT_CARD][CARD_HOLDER_NAME])
    this.purchForm.controls["cvv"].setValue(this.user[CREDIT_CARD][CARD_CVV])

    let expireDate: string = this.user[CREDIT_CARD][CARD_EXPIRATION_DATE]

    if (expireDate) {
      this.purchForm.controls["expDateMM"].setValue(expireDate.substring(3, 5))
      this.purchForm.controls["expDateYYYY"].setValue("20" + expireDate.substring(0, 2))
    }

  }

  calculatePrice(controlType, value) {
    if (controlType == "tvplayersQty") {
      this.tvAdPrice = 150 * value
    } else if (controlType == "locQty") {
      this.locationPrice = 150 * value
    } else if (controlType == 'onlineQty') {
      this.onlinePrice = 85 * value
    }

    this.totalPrice = (this.tvAdPrice || 0) + (this.locationPrice || 0) + (this.onlinePrice || 0)
    this.taxes = (this.tvAdPrice || 0) * 0.09
    this.totalWithTaxes = this.totalPrice + this.taxes
  }

  onSubmit() {
    // 117.18 TV AD Players Quantity
    // 117.20 Online Subscription Qty
    // 117.21 Location Subscription Qty
    // 55.3 Total Amount

    this.user[TV_PLAYERS_QTY] = this.purchForm.controls["tvplayersQty"].value.toString()
    this.user[ONLINE_SUBSCR_QTY] = this.purchForm.controls["onlineQty"].value.toString()
    this.user[LOCATION_SUBSCR_QTY] = this.purchForm.controls["locQty"].value.toString()
    this.user[TOTAL_AMOUNT] = this.totalWithTaxes.toString()

    let yyyy: string = this.purchForm.controls["expDateYYYY"].value.toString()

    this.user[CREDIT_CARD] =
      {
        [CARD_ACCOUNT_NUMBER]: this.purchForm.controls["accountNumber"].value,
        [CARD_TOKEN]: this.purchForm.controls["accountNumber"].value,
        [CARD_TYPE]: NmcService.GetCardType(this.purchForm.controls["accountNumber"].value),
        [CARD_NICK_NAME]: this.purchForm.controls["nameOnAccount"].value,
        [CARD_HOLDER_NAME]: this.purchForm.controls["nameOnAccount"].value,
        [CARD_CVV]: this.purchForm.controls["cvv"].value.toString(),
        [CARD_EXPIRATION_DATE]: yyyy.substring(2, 4) + "-" + this.purchForm.controls["expDateMM"].value
      }

    localStorage.setItem("currentUser", JSON.stringify(this.user))

    this.router.navigate(["/billingAdr"])

  }

}
