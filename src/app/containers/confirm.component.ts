import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {FormGroup, FormBuilder} from "@angular/forms";
import {NmcService} from "../services/nmc_service";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'aio-confirm',
  templateUrl: 'confirm.component.html'
})
export class ConfirmComponent implements OnInit {


  confirmForm: FormGroup;
  user: User

  constructor(private formBuilder: FormBuilder, private ds: NmcService, private router: Router, private snackBar: MdSnackBar) {
    this.confirmForm = formBuilder.group({
      'agree': [false]
    });

  }

  ngOnInit() {
    //console.log(this.showAddress )
    this.user = JSON.parse(localStorage.getItem('currentUser'))
  }

  onSubmit() {

    this.ds.saveUser(this.user).subscribe()
    this.router.navigate(["ok"])

  }

  checkValid() {
    //console.log(this.billAdrForm.status == 'VALID'? true: false)
    return !this.confirmForm.controls['agree'].value
  }
}
