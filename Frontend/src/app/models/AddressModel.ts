import {Address} from './Address';

export class AddressModel {
  public street: string;
  public localnumber: string;
  public postalcode: string;
  public city: string;
  public country: string;


  constructor(input: Address) {
    this.street = input?.street;
    this.localnumber = input?.local_number;
    this.postalcode = input?.postal_code;
    this.city = input?.city;
    this.country = input?.country;
  }
}
