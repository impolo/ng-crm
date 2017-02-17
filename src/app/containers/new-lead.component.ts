import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {NmcService} from "../services/nmc_service";
import {CrmService} from "../services/crm.service";
import {Router} from "@angular/router";
import {Lead} from "../models/lead";
import {Category} from "../models/category";
import {HOME_ADDRESS} from "../models/dics";

@Component({
  selector: 'aio-new-lead',
  templateUrl: './new-lead.component.html'
})
export class NewLeadComponent implements OnInit {

  loading: boolean
  newLeadForm: FormGroup;
  rootCategories: Category[] = []
  categories: Category[] = []
  businessCategories: Category[] = []

  addressType = HOME_ADDRESS

  customerCategories: string[]

  leads: Lead[] = []


  constructor(private formBuilder: FormBuilder, private ds: NmcService, private cs: CrmService, private router: Router) {
    //this.user = JSON.parse(localStorage.getItem('currentUser'))
    this.newLeadForm = formBuilder.group({
      'rootCategories': [''],
      'categories': [''],
      'textSearch': ['']
    });

  }

  ngOnInit() {
    this.loading = true
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

        this.loading = false
      },
      error => {
        this.ds.showGeneralError(error)
        this.loading = false
      }
    )

  }

  onClick(categoryId) {
    let index = this.customerCategories.indexOf(categoryId)
    if (index > -1) {
      this.customerCategories.splice(index, 1)
    } else {
      this.customerCategories.push(categoryId)
    }
  }

  changeCompanyType(value: any) {
    this.businessCategories = []
    this.categories.filter(category => {
      if (category.parentId === value)
        this.businessCategories.push(category)
    })
  }

  onSearch() {
    //console.log("searching")
    this.loading = true
    this.cs.searchLeads(
      this.newLeadForm.controls['rootCategories'].value,
      this.newLeadForm.controls['categories'].value,
      this.newLeadForm.controls['textSearch'].value
    ).subscribe(
      data => {
        this.loading = false
        this.leads = []
        data.forEach(lead => this.leads.push(lead))
        // console.log(data)
      },
      error => {
        this.loading = false
        this.cs.showCrmError(error)
      }


    )
  }

  onSubmit() {
    // this.customerCategories.forEach( cat => this.user[CATEGORY_USER].push({"114.93": NmcService.pad(cat)}))
    // this.user[RETURN_POLICY] = NmcService.toHex(this.detailForm.controls['returnPolicy'].value)
    // localStorage.setItem("currentUser", JSON.stringify(this.user))
    // this.router.navigate(["/purchasing"])
  }

  onCancel() {
    this.router.navigate(["/searchLeads"])
  }
}
