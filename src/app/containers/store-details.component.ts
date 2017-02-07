import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {User} from "../models/user";
import {NmcService} from "../services/nmc_service";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {Category} from "../models/category";
import {RETURN_POLICY, CATEGORY_USER} from "../models/nmc_fields";

@Component({
  selector: 'aio-store-details',
  templateUrl: './store-details.component.html'
})
export class StoreDetailsComponent implements OnInit {

  loading: boolean
  detailForm: FormGroup;
  user: User
  rootCategories: Category[] = []
  categories: Category[] = []

  customerCategories: string[]


  constructor(private formBuilder: FormBuilder, private ds: NmcService, private router: Router, private snackBar: MdSnackBar) {
    this.user = JSON.parse(localStorage.getItem('currentUser'))

    this.detailForm = formBuilder.group({
      'returnPolicy': [NmcService.hexToStr(this.user[RETURN_POLICY]), Validators.required]
    });
  }

  ngOnInit() {

    this.customerCategories = []

    this.ds.categories().subscribe(
      data => {
        data.map(category => {
          if (category.level == "1") {
            this.rootCategories.push(category)
          } else {
            this.categories.push(category)
          }

        })

        this.rootCategories.forEach(category => {
          this.categories.forEach(child => {
            if (child.parentId == category.categoryId) {
              category.childrens.push(child)
            }
          })
        })

        this.loading = false
      },
      error => {
        this.snackBar.open(error)
        this.loading = false
      }
    )

  }

  onClick(categoryId) {
    let index = this.customerCategories.indexOf(categoryId)
    if (index > -1) {
      this.customerCategories.splice(index, 1)
    }  else {
      this.customerCategories.push(categoryId)
    }
  }

  onSubmit() {
    this.customerCategories.forEach( cat => this.user[CATEGORY_USER].push({"114.93": NmcService.pad(cat)}))
    this.user[RETURN_POLICY] = NmcService.toHex(this.detailForm.controls['returnPolicy'].value)
    localStorage.setItem("currentUser", JSON.stringify(this.user))
    this.router.navigate(["/purchasing"])
  }


}
