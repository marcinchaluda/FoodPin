import {User} from './User';
import {AddressModel} from './AddressModel';

export class UserModel {
  public id: number;
  public username: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public password: string;
  public phone: string;
  public address: object;


  constructor(input: User) {
    this.id = input?.id;
    this.username = input?.username;
    this.firstname = input?.firstname;
    this.lastname = input?.lastname;
    this.email = input?.email;
    this.password = input?.password;
    this.phone = input?.phone;
    this.address = this.createAddress(input?.address);
  }
  // tslint:disable-next-line:typedef
  createAddress(address: object | undefined) {
    return new AddressModel(address);
  }
}
