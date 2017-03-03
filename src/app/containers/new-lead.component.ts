import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {NmcService} from "../services/nmc_service";
import {CrmService} from "../services/crm.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Lead} from "../models/lead";
import {Category} from "../models/category";
import {HOME_ADDRESS} from "../models/dics";
import {error} from "util";
import {Observable} from "rxjs";

@Component({
  selector: 'aio-new-lead',
  templateUrl: './new-lead.component.html'
})
export class NewLeadComponent implements OnInit {

  loading: boolean
  editLeadForm: FormGroup;
  rootCategories: Category[] = []
  categories: Category[] = []
  businessCategories: Category[] = []

  addressType = HOME_ADDRESS

  customerCategories: string[]

  leads: Lead[] = []

  pLeadId: any
  editedLead: Lead

  editMode: boolean = false

  constructor(private formBuilder: FormBuilder, private ds: NmcService, private cs: CrmService, private router: Router, private aroute: ActivatedRoute) {
    //this.user = JSON.parse(localStorage.getItem('currentUser'))


    this.editLeadForm = formBuilder.group({
      'rootCategories': [''],
      'categories': [''],
      'companyName': [''],
      'contactName': [''],
      'contactEmail': [''],
      'contactPhone': [''],
    });

  }

  ngOnInit() {
    this.loading = true
    this.customerCategories = []

    this.ds.categories()
      .flatMap(data => {
        data.map(category => {
          if (category.level == "1") {
            this.rootCategories.push(category)
          } else {
            this.categories.push(category)
          }

        })
        return this.aroute.params
      })
      .flatMap(data => {
        this.pLeadId = data['id']
        if (this.pLeadId) {
          this.editMode = true
          return this.cs.getLeadById(this.pLeadId)
        } else {
          return Observable.of(new Lead())
        }
      })
      .subscribe(data => {
          console.log(data)
          this.editedLead = data
          this.loading = false
          this.editLeadForm.controls['rootCategories'].setValue(this.editedLead.SLSCRMLeadCompanyType)
          this.changeCompanyType(this.editedLead.SLSCRMLeadCompanyType)
          this.editLeadForm.controls['categories'].setValue(this.editedLead.SLSCRMLeadCategoryType)
          this.editLeadForm.controls['companyName'].setValue(this.editedLead.SLSCRMLeadCompany)
          this.editLeadForm.controls['contactName'].setValue(this.editedLead.SLSCRMLeadFullName)
          this.editLeadForm.controls['contactEmail'].setValue(this.editedLead.SLSCRMLeadEMail)
          this.editLeadForm.controls['addr1'].setValue(this.editedLead.SLSCRMLeadAddress1)
          this.editLeadForm.controls['addr2'].setValue(this.editedLead.SLSCRMLeadAddress2)
          console.log(this.editedLead.SLSCRMStateId)
          this.editLeadForm.controls['stateId'].setValue(this.editedLead.SLSCRMStateId)
          this.editLeadForm.controls['cityId'].setValue(this.editedLead.SLSCRMCityId)
        },
        error => {
          console.log(error)
          this.loading = false
         // this.cs.showCrmError(error)
        })
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

  saveToCrm() {

    this.loading = true

    this.editedLead.SLSCRMLeadCompanyType = this.editLeadForm.controls['rootCategories'].value
    this.editedLead.SLSCRMLeadCategoryType = this.editLeadForm.controls['categories'].value
    this.editedLead.SLSCRMLeadCompany = this.editLeadForm.controls['companyName'].value
    this.editedLead.SLSCRMLeadFullName = this.editLeadForm.controls['contactName'].value
    this.editedLead.SLSCRMLeadFirstName = this.editLeadForm.controls['contactName'].value
    this.editedLead.SLSCRMLeadEMail = this.editLeadForm.controls['contactEmail'].value
    this.editedLead.SLSCRMLeadAddress1 = this.editLeadForm.controls['addr1'].value
    this.editedLead.SLSCRMLeadAddress2 = this.editLeadForm.controls['addr2'].value
    this.editedLead.SLSCRMCountryId = this.editLeadForm.controls['countryId'].value
    this.editedLead.SLSCRMStateId = this.editLeadForm.controls['stateId'].value
    this.editedLead.SLSCRMCityId = this.editLeadForm.controls['cityId'].value
    //   this.editedLead. = this.editLeadForm.controls['addr2'].value
    console.log(this.editedLead)



    if (this.editedLead.SLSCRMLeadId &&   this.editedLead.SLSCRMLeadId != 0) {
      this.cs.updateLead(this.editedLead).subscribe(
        data => {
          this.loading = false
          console.log(data)
        },
        error => {
          this.loading = false
          this.cs.showCrmError(error)
        }
      )
    }
    else {
      this.cs.createLead(this.editedLead).subscribe(
        data => {
          this.loading = false
          console.log(data)
        },
        error => {
          this.loading = false
          this.cs.showCrmError(error)
        }
      )
    }
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
