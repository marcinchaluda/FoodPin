import {Component, OnInit} from '@angular/core';
import {faEdit, faSave} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {patternValidator} from "../../validators/patternValidator.validator";
import {BehaviorSubject, Observable} from "rxjs";
import {NavbarService} from "../../shared/navbar/navbar.service";
import {User} from "../../models/User";
import {Address} from "../../models/Address";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  editIcon = faEdit;
  saveIcon = faSave;
  accountForm: FormGroup;
  addressForm: FormGroup;
  isOpen$: BehaviorSubject<boolean>;
  user: User;

  constructor(
    private _formBuilder: FormBuilder,
    private _navbarService: NavbarService,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.user = this.setUserData();
    this.addressForm = this.generateAddressForm();
    this.accountForm = this.generateAccountForm();
    this.isOpen$ = this._navbarService.isOpen$;
    this.accountForm.disable();
  }

  private generateAccountForm(): FormGroup {
    return this._formBuilder.group({
      username: [this.user.username , Validators.compose([Validators.minLength(6)])],
      firstname: [this.user.firstname],
      lastname: [this.user.lastname],
      email: [this.user.email , Validators.compose([Validators.email])],
      phone: [this.user.phone , patternValidator(/^[+]*[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/, {invalidNumber: true})],
      address: this.addressForm,
    });
  }

  private generateAddressForm(): FormGroup {
    return this._formBuilder.group({
      street: [this.user.address['street']],
      localnumber: [this.user.address['localnumber']],
      postalcode: [this.user.address['postalcode'], patternValidator(/\d{2}-\d{3}/, {invalidPostalCode: true})],
      city: [this.user.address['city']],
      country: [this.user.address['country']],
    });
  }

  public onSubmit(): void {
    this.accountForm.disable();
    this.updateUserData(this.user);
    // console.log(this.user);
  }

  public enableForm(): void {
    this.accountForm.enable();
  }

  private setUserData(): User {
    const userData = this.getUserData();
    const address = this.setUserAddress(userData['address']);
    const user: User = ({
      username: userData['username'],
      firstname: userData['firstname'],
      lastname: userData['lastname'],
      email: userData['email'],
      phone: userData['phone'],
      address: address,
    });
    return user;
  }

  private getUserData() {
    const userId: number = 1;
    return this._userService.getUser(userId);
  }

  private setUserAddress(addressData: object): Address {
    const address: Address = ({
      street: addressData['street'],
      localnumber: addressData['localnumber'],
      postalcode: addressData['postalcode'],
      city: addressData['city'],
      country: addressData['country'],
    });
    return address;
  }

  private updateUserData(user: object): void {
    Object.keys(user).forEach(
      (key) => {
        user[key] = this.accountForm.get(key).value;
    });
    console.log(user);
    //TODO patch user data
  }
}
