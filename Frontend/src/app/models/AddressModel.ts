import {Address} from './Address';

export class AddressModel {
  public street: string;
  public localnumber: string;
  public postalcode: string;
  public city: string;
  public country: string;


  constructor(input: Address) {
    this.street = input?.street;
    this.localnumber = input?.localnumber;
    this.postalcode = input?.postalcode;
    this.city = input?.city;
    this.country = input?.country;
  }
}
