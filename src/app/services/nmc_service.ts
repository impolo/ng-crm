import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx'
import {NmcRequest} from './nmc_request'
import {NmcOperations} from "./operations";
import any = jasmine.any;
import {Observable} from "rxjs";
import {Param} from "../models/param";
import {Extractors} from "./extractors";
import {User} from "../models/user";
import {Country} from "../models/country";
import {State} from "../models/state";
import {City} from "../models/city";
import {Zipcode} from "../models/zipcode";
import {isUndefined} from "util";
import {Category} from "../models/category";
import {
  ADDR1, ADDR2, ADDRESS_TYPE, COUNTRY_ID, STATE_ID, CITY_ID, ZIPCODE_ID,
  ADDRESS_PHONE_NUM, ADDRESS_PHONE_EXT
} from "../models/nmc_fields";
import {isString} from "util";
import {environment} from "../../environments/environment";


@Injectable()
export class NmcService {

  //temporally
  API_PATH = environment.service_url

  private _countries: Observable<Country[]>

  constructor(private http: Http) {

  }

  getParams(): Observable<Param[]> {
    let nmcRequest = new NmcRequest()
    nmcRequest.OPTLST.push(this.operations.getParams())

    return this.http.post(this.API_PATH, this.body(nmcRequest), this.headers)
      .map(res => Extractors.param(res.json().RESULT[0].RESULT)
      )

  }

  login(email: string, password: string): Observable<User[]> {
    return this.call<User>([this.operations.login(email, NmcService.toHex(password))], User.extract)
  }

  countries(): Observable<Country[]> {

    return this.call<Country>([this.operations.countries()], Extractors.country)
  }

  states(countryId: string): Observable<State[]> {
    return this.call<State>([this.operations.states(NmcService.pad(countryId))], Extractors.states)
  }

  cities(stateId: string): Observable<City[]> {
    return this.call<City>([this.operations.cities(NmcService.pad(stateId))], Extractors.cities)
  }

  zipcodes(zipcodeId: string): Observable<Zipcode[]> {
    return this.call<Zipcode>([this.operations.zipcodes(NmcService.pad(zipcodeId))], Extractors.zipcodes)
  }

  categories(): Observable<Category[]> {
    return this.call<Category>([this.operations.categories()], Category.extract)
  }

  saveUser(user): Observable<User[]> {
    return this.call<User>([this.operations.saveUser(user)], User.extract)
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Address type :
  // 11 Home
  // 12 Work
  // 13 Shipping
  // 14 Billing
  // 15 Other
  addressAsObject(addressTypeId, addr1, addr2, countryId, stateId, cityId, zipcodeId, phoneNum, phoneExt) {

    let addr = {}
    addr[ADDRESS_TYPE] = NmcService.pad(addressTypeId)
    addr[ADDR1] = addr1
    addr[ADDR2] = addr2
    addr[COUNTRY_ID] = NmcService.pad(countryId)
    addr[STATE_ID] = NmcService.pad(stateId)
    addr[CITY_ID] = NmcService.pad(cityId)
    addr[ZIPCODE_ID] = NmcService.pad(zipcodeId)
    addr[ADDRESS_PHONE_NUM] = phoneNum
    addr[ADDRESS_PHONE_EXT] = phoneExt

    return addr
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  operations = new NmcOperations()


  public call<T>(options: any[], extractor: (any)): Observable<T[]> {

    let nmcRequest = new NmcRequest()
    options.forEach(option => nmcRequest.OPTLST.push(option))

    //console.log(JSON.stringify(nmcRequest))

    return this.http.post(this.API_PATH, this.body(nmcRequest), this.headers)
      .map(res => {
       // console.log(res)
        return this.ok(res.json().RESULT[0]) ?
          extractor(res.json().RESULT[0].RESULT) : Observable.throw(res.json().RESULT[0]["44"])
      }).publishLast().refCount();
  }

  public body(body: NmcRequest): any {
    return window.btoa(JSON.stringify(body))
  }

  public headers(): Headers {
    let headers = new Headers();
    headers.append("Accept", "text/plain")
    headers.append("Accept-Charset", "utf-8")
    return headers
  }

  static toHex(str) {
    var hex = '';
    if (str) {
      for (var i = 0; i < str.length; i++) {
        hex += '' + str.charCodeAt(i).toString(16);
      }
      return hex;
    } else return ""

  }

  static hexToStr(hex) {

    var str = '';
    if (isString(hex)) {
      for (var i = 0; i < hex.length; i += 2) {
        var v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
      }
    }
    return str;
  }

  ok(res: any): boolean {
    return res["44"] == "Transaction Approved"
  }

  static pad(num: string): string {
    var s = num + "";
    while (s.length < 11) s = "0" + s;
    return s;
  }

  static isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  // 61 VISA
  // 62 MASTERCARD
  // 63 AMERICAN EXPRESS
  // 65 Discover
  // 66 Bank Account
  // 69 Debit Card

  static GetCardType(number) {
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
      return NmcService.pad("61"); //VISA

    // Mastercard
    re = new RegExp("^5[1-5]");
    if (number.match(re) != null)
      return NmcService.pad("62"); //MASTERCARD
    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
      return NmcService.pad("63"); // AMEX

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
      return NmcService.pad("65"); //Discover

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
      return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
      return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
      return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
      return "Visa Electron";

    return "";
  }


}
