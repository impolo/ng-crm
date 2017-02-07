import {Param} from "../models/param";
import {User} from "../models/user";
import {Country} from "../models/country";
import {State} from "../models/state";
import {City} from "../models/city";
import {Zipcode} from "../models/zipcode";
export class Extractors {

  static param(objects: any[]): Param[] {
    return objects.map(obj => new Param(obj["127.11"], obj["127.12"]))
  }


  static country(objects: any[]): Country[] {
    return objects[0]["CO"].map(obj => {
      let country = new Country()
      country.countryId = obj["122.87"]
      country.countryName= obj["47.18"]
      country.countryCode = obj["114.17"]
      country.countryIndicative = obj["120.129"]
      return country
    })
  }

  static states(objects: any[]): State[] {

    if (!(objects[0]["ST"] instanceof Array)) {
      return []
    }

    return objects[0]["ST"].map(obj => {
      let state = new State()
      state.countryId = obj["122.87"]
      state.stateName= obj["47.16"]
      state.stateId = obj["120.13"]
      return state
    })
  }

  static cities(objects: any[]): State[] {

    if (!(objects[0]["CI"] instanceof Array)) {
      return []
    }

    return objects[0]["CI"].map(obj => {
      let city = new City()
      city.cityId = obj["114.14"]
      city.cityName= obj["47.15"]
      city.stateId = obj["120.13"]
      return city
    })
  }

  static zipcodes(objects: any[]): Zipcode[] {

    if (!(objects[0]["ZP"] instanceof Array)) {
      return []
    }

    return objects[0]["ZP"].map(obj => {
      let zipcode = new Zipcode()
      zipcode.cityId = obj["114.14"]
      zipcode.zipcodeName= obj["47.17"]
      zipcode.zipcodeId = obj["122.107"]
      return zipcode
    })
  }

}
