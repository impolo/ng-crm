import {
  FIRST_NAME, LAST_NAME, USER_ID, COMPANY_NAME, TAX_ID_NUMBER, MULT_LOCATION_QTY, USER_EMAIL,
  USER_TITLE, RETURN_POLICY, ADDRESS_STRUCT, CATEGORY_USER, PHONE_STRUCT, CREDIT_CARD, MERCHANT_ID, OWNER_ID,
  TV_PLAYERS_QTY, LOCATION_SUBSCR_QTY, ONLINE_SUBSCR_QTY, CARD_ACCOUNT_NUMBER, CARD_HOLDER_NAME, CARD_NICK_NAME,
  CARD_TOKEN, CARD_EXPIRATION_DATE, CARD_CVV, PHONE_TYPE_ID, PHONE_COUNTRY_ID, PHONE_NUMBER, PHONE_EXT
} from "./nmc_fields";
import {NmcService} from "../services/nmc_service";
export class User {

  static extract(objArray) {
    let obj = objArray[0]
    let user = {}
    user[FIRST_NAME] = obj[FIRST_NAME]
    user[LAST_NAME] = obj[LAST_NAME]
    // user[USER_ID] = obj[USER_ID]
    user[COMPANY_NAME] = obj[COMPANY_NAME]
    user[USER_EMAIL] = obj[USER_EMAIL]
    user[USER_TITLE] = obj[USER_TITLE]
    user[ADDRESS_STRUCT] = []
    user[CATEGORY_USER] = []
    user[PHONE_STRUCT] = []

    // if (obj[PHONE_STRUCT]) {
    //   obj[PHONE_STRUCT].forEach(phone => {
    //     //console.log(phone.toString())
    //     let userPhone = {}
    //     userPhone[PHONE_TYPE_ID] = NmcService.pad(phone[PHONE_TYPE_ID])
    //     userPhone[PHONE_COUNTRY_ID] = NmcService.pad(phone[PHONE_COUNTRY_ID])
    //     userPhone[PHONE_NUMBER] = phone[PHONE_NUMBER]
    //     userPhone[PHONE_EXT] = phone[PHONE_EXT]
    //     user[PHONE_STRUCT].push(userPhone)
    //   })
    // }
    user[CREDIT_CARD] = {}
    // ///////////////////////////////////////////////
    // if (obj[CREDIT_CARD]) {
    //   user[CREDIT_CARD] = {
    //     [CARD_ACCOUNT_NUMBER]: obj[CREDIT_CARD][CARD_ACCOUNT_NUMBER],
    //     [CARD_HOLDER_NAME]: obj[CREDIT_CARD][CARD_HOLDER_NAME],
    //     [CARD_NICK_NAME]: obj[CREDIT_CARD][CARD_NICK_NAME],
    //     [CARD_TOKEN]: obj[CREDIT_CARD][CARD_TOKEN],
    //     [CARD_EXPIRATION_DATE]: obj[CREDIT_CARD][CARD_EXPIRATION_DATE],
    //     [CARD_CVV]: obj[CREDIT_CARD][CARD_CVV]
    //   }
    // }
    user[OWNER_ID] = "001"
    user[MERCHANT_ID] = obj[USER_ID]

       // user[TV_PLAYERS_QTY] = obj[TV_PLAYERS_QTY]
    // user[LOCATION_SUBSCR_QTY] = obj[LOCATION_SUBSCR_QTY]
    // user[ONLINE_SUBSCR_QTY] = obj[ONLINE_SUBSCR_QTY]


    user[TV_PLAYERS_QTY] = "0"
    user[LOCATION_SUBSCR_QTY] = "0"
    user[ONLINE_SUBSCR_QTY] = "0"


    return user
  }

  // 114.70 Company name
  // 123.71 Tax Id Number
  // 114.121 Multiple location Qty
  //
  // 114.3 Firstname
  // 114.5 Lastname
  // 114.7 email
  // 114.91 Title
  //
  // 119.16 Return Policy
  //
  // PH Phone Struct
  // 48.28 Phone number
  // 121.167 Extension
  // 122.87 Country Id
  // 121.62 Phone Type Id
  //
  // AD Address Struct
  // 121.45 Address Type Id
  // 114.12 Address First line
  // 114.13 Address Second line
  // 122.87 Country Id
  // 120.13 State Id
  // 114.14 City Id
  // 122.107 Zipcode Id
  //
  // CU Category User
  // 114.93 Category Id
  //
  // AC Credit Card Struct
  // 2 Account number
  // 48.15 Card token
  // 118.5 Card expiration date
  // 120.7 Type credit card
  // 48.6 Nickname
  // 48.2 Cardholder name
  // 48.4 Card verification number
  // 47.17 Zipcode
  //
  // 117.18 TV AD Players Quantity
  // 117.20 Online Subscription Qty
  // 117.21 Location Subscription Qty
  // 55.3 Total Amount
  //
  // 114.179 Merchant Id (Optional)
  // 52 Password (Temporal)
  // 127.10 Owner Id (001)


}
