import {User} from "../models/user";
export class NmcOperations {

  public getParams(): any {
    return {"101": "010100027", "PARAM": {"127.14": "PORTAL"}};
  }

  public login(email: string, password: string): any {
    return {"101": "050400121", "PARAM": {"114.7": email, "52": password}};
  }

  public countries(): any {
    return {"101": "010100232", "PARAM": {}};
  }

  public states(countryId: string): any {
    return {"101": "010100233", "PARAM": {"122.87": countryId}};
  }

  public cities(stateId: string): any {
    return {"101": "010100234", "PARAM": {"120.13": stateId}};
  }

  public zipcodes(cityId: string): any {
    return {"101": "010100235", "PARAM": {"114.14": cityId}};
  }

  public categories(): any {
    return {"101": "010100025", "PARAM": {}};
  }

  public saveUser(user): any {
    return {"101": "030300568", "PARAM": user};
  }

}
