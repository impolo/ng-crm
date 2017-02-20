import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from "@angular/http";
import {CRM_SALES_SEARCH} from "./crm";
import {error} from "util";
import {isNull} from "util";
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs";
import {Md5} from "ts-md5/dist/md5";
import {isEmpty} from "rxjs/operator/isEmpty";
import {MdSnackBar} from "@angular/material";

@Injectable()
export class CrmService {
  private leadsUrl: string;


  constructor(private http: Http, private snackBar: MdSnackBar) {


    let url = window.localStorage.getItem('webapiurl');
    console.log(url)
    this.leadsUrl = `${url}/SLSCRM_LeadsDataServices_21320_AIOLAX`;
  }

  getLeads() {
    let sUrl = `${this.leadsUrl}/Gets?pageIndex=1&pageSize=2`;
    return this.http.get(sUrl)
      .map(resp => resp.json());

  }

  getSalesMen(email: string) {
    return this.http.get(`/SLSCRM_SalesmansDataServices_21307_AIOLAX/Search?term=${email}`)
      .map(resp => resp.json())
  }

  login(userId: Number, password: string) {
    let passHash = Md5.hashStr(password)
    return this.http.get(`/SLSCRM_SalesmansDataServices_21307_AIOLAX?Compania=1&SLSCRMSalesmanId=${userId}&SLSCRMSalesmanPassword=${passHash}`)
      .map(resp => resp.json())
  }

  searchLeads(companyType: string, businessCategory: string, term: string) {
    let url = '/SLSCRM_LeadsDataServices_21320_AIOLAX/Search'

    url += `?term=${term}&SLSCRMLeadCompanyType=${companyType}&SLSCRMLeadCategoryType=${businessCategory}`
    return this.http.get(url)
      .map(resp => resp.json())
  }

  getLeadById(leadId: any) {
    let url = '/SLSCRM_LeadsDataServices_21320_AIOLAX/'

    url += `?Compania=1&SLSCRMLeadId=${leadId}`
    return this.http.get(url)
      .map(resp => resp.json())
  }

  showCrmError(error: any) {
    let response = JSON.parse(error['_body'])
    this.snackBar.open(response[0]['Message'], 'close', {
      duration: 3000
    })
  }

}
