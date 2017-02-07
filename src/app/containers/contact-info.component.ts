import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {User} from "../models/user";
import {NmcService} from "../services/nmc_service";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {Country} from "../models/country";
import {
  FIRST_NAME, LAST_NAME, USER_EMAIL, USER_TITLE, PHONE_COUNTRY_ID, PHONE_TYPE_ID,
  PHONE_STRUCT, PHONE_NUMBER, PHONE_EXT
} from "../models/nmc_fields";
import {WORK_PHONE, MOBILE_PHONE} from "../models/dics";
import {isEmpty} from "rxjs/operator/isEmpty";

@Component({
  selector: 'aio-contact-info',
  templateUrl: './contact-info.component.html'
})
export class ContactInfoComponent implements OnInit {

  loading: boolean
  contactForm: FormGroup;
  user: User

  countries: Country[] = []
  workPhone = {}
  mobilePhone = {}

  constructor(private formBuilder: FormBuilder, private ds: NmcService, private router: Router, private snackBar: MdSnackBar) {
    this.user = JSON.parse(localStorage.getItem('currentUser'))

    this.contactForm = formBuilder.group({
      'firstName': [this.user[FIRST_NAME], [
        Validators.required
      ]],
      'lastName': [this.user[LAST_NAME], Validators.required],
      'email': [this.user[USER_EMAIL], Validators.required],
      'title': [this.user[USER_TITLE]],
      'countryW': [, Validators.required],
      'phoneCodeW': ['', Validators.required],
      'phoneNumW': ['', Validators.required],
      'phoneNumWExt': [''],
      'countryM': [''],
      'phoneCodeM': [''],
      'phoneNumM': [''],
      'phoneNumMExt': ['']
    });
  }

  ngOnInit() {

    this.ds.countries().subscribe(
      data => {
        data.map(country => {
          if (country.countryCode == "US") {
            this.contactForm.controls['countryW'].setValue(country.countryId)
            this.contactForm.controls['countryM'].setValue(country.countryId)
            this.contactForm.controls['phoneCodeW'].setValue("+" + country.countryIndicative)
            this.contactForm.controls['phoneCodeM'].setValue("+" + country.countryIndicative)
            this.countries.push(country)
          }
        })
        this.loading = false
      },
      error => {
        this.snackBar.open(error)
        this.loading = false
      }
    )

    this.workPhone = this.user[PHONE_STRUCT].filter(phone => phone[PHONE_TYPE_ID] == WORK_PHONE)
    if (!NmcService.isEmpty(this.workPhone)) {
      this.contactForm.controls['phoneNumW'].setValue(this.workPhone[0][PHONE_NUMBER])
      this.contactForm.controls['phoneNumWExt'].setValue(this.workPhone[0][PHONE_EXT])
    }

    this.mobilePhone = this.user[PHONE_STRUCT].filter(phone => phone[PHONE_TYPE_ID] == MOBILE_PHONE)
    if (!NmcService.isEmpty(this.mobilePhone)) {
      this.contactForm.controls['phoneNumM'].setValue(this.mobilePhone[0][PHONE_NUMBER])
      this.contactForm.controls['phoneNumMExt'].setValue(this.mobilePhone[0][PHONE_EXT])
    }

  }

  onSubmit() {

    let workPhone = {}
    workPhone[PHONE_TYPE_ID] = WORK_PHONE
    workPhone[PHONE_COUNTRY_ID] = NmcService.pad(this.contactForm.controls['countryW'].value)
    workPhone[PHONE_NUMBER] = this.contactForm.controls['phoneNumW'].value.toString().replace(/[^0-9\.]/g, '')
    workPhone[PHONE_EXT] = this.contactForm.controls['phoneNumWExt'].value.toString()

    let workPhoneIndex = this.user[PHONE_STRUCT].findIndex(phone => phone[PHONE_TYPE_ID] == WORK_PHONE)
    if (workPhoneIndex != -1)
      this.user[PHONE_STRUCT][workPhoneIndex] = workPhone
    else
      this.user[PHONE_STRUCT].push(workPhone)

    if (this.contactForm.controls['phoneNumM']) {
      let mobilePhone = {}
      mobilePhone[PHONE_TYPE_ID] = MOBILE_PHONE
      mobilePhone[PHONE_COUNTRY_ID] = NmcService.pad(this.contactForm.controls['countryM'].value)
      mobilePhone[PHONE_NUMBER] = this.contactForm.controls['phoneNumM'].value.toString().replace(/[^0-9\.]/g, '')
      mobilePhone[PHONE_EXT] = this.contactForm.controls['phoneNumMExt'].value.toString()

      let mobilePhoneIndex = this.user[PHONE_STRUCT].findIndex(phone => phone[PHONE_TYPE_ID] == MOBILE_PHONE)
      if (mobilePhoneIndex != -1)
        this.user[PHONE_STRUCT][mobilePhoneIndex] = mobilePhone
      else
        this.user[PHONE_STRUCT].push(mobilePhone)
    }

    localStorage.setItem("currentUser", JSON.stringify(this.user))

    this.router.navigate(["/storeDetails"])
  }

}
