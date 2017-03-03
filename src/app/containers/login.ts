import {Component, Input} from '@angular/core';
import {User} from "../models/user";
import {NgForm, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VALID} from "@angular/forms/src/model";
import {NmcService} from "../services/nmc_service";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {AuthGuard} from "../guards/auth.guard";
import {CrmService} from "../services/crm.service";
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs";
import {error} from "util";


@Component({
  selector: 'aio-login',
  templateUrl: './login.html',
  providers: [NmcService, MdSnackBar]

})
export class LoginComponent {

  loading = false
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private cs: CrmService, private router: Router, private snackBar: MdSnackBar, private ag: AuthGuard) {
    this.loginForm = formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      'password': ['', Validators.required]

    });
  }

  ngOnInit() {
    //this.cs.getLeads().subscribe(data => console.log(data))

  }

  onSubmit() {
    if (this.loginForm.status == VALID) {
      this.loading = true;

      this.cs.getSalesMen(this.loginForm.controls["email"].value).subscribe(
        data => {
          //console.log(data[0])
          if (isNullOrUndefined(data[0])) {
            this.snackBar.open("user not found")
            this.loading = false
          } else {
            this.cs.login(data[0]['SLSCRMSalesmanId'], this.loginForm.controls["password"].value).subscribe(
              data => {
                this.loading = false
                localStorage.setItem("currentUser", JSON.stringify(data))
                this.router.navigate(["/searchLeads"])
              },
              error => {
                let response = JSON.parse(error['_body'])
                this.snackBar.open(response[0]['Message'], 'close', {
                  duration: 3000
                })
              }
            )
          }
        },
        error => {
          this.snackBar.open(error, 'close', {
            duration: 3000
          })
          this.loading = false
        }
      )

    }
  }

}
