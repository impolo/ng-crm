import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response} from "@angular/http";

@Injectable()
export class CrmService {

  constructor(private http: Http) { }

  getLeads() {
    return this.http.get("http://sandbox.multiclicksistemas.net/SLSCRM_LeadsDataServices_21320_AIOLAX/Gets?pageIndex=1&pageSize=2")
      .map( resp => resp.json())

  }

}
