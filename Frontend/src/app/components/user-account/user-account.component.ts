import {Component, OnInit} from '@angular/core';
import {faEdit, faSave} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {patternValidator} from "../../validators/patternValidator.validator";
import {BehaviorSubject, Observable} from "rxjs";
import {NavbarService} from "../../shared/navbar/navbar.service";
import {User} from "../../models/User";
import {Address} from "../../models/Address";
import {UserService} from "../../services/user.service";
import {log} from "util";

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
    this.addressForm = this.generateAddressForm();
    this.accountForm = this.generateAccountForm();
    this.isOpen$ = this._navbarService.isOpen$;
    this.user = this.setUserData();
    this.accountForm.disable();
  }

  private generateAccountForm(): FormGroup {
    return this._formBuilder.group({
      username: [null , Validators.compose([Validators.minLength(6)])],
      firstname: [null],
      lastname: [null],
      email: [null , Validators.compose([Validators.email])],
      phone: [null , patternValidator(/^[+]*[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/, {invalidNumber: true})],
      address: this.addressForm,
    });
  }

  private generateAddressForm(): FormGroup {
    return this._formBuilder.group({
      street: [null],
      localnumber: [null],
      postalcode: [null, patternValidator(/\d{2}-\d{3}/, {invalidPostalCode: true})],
      city: [null],
      country: [null],
    });
  }

  public onSubmit(): void {
    this.accountForm.disable();
    this.updateUserData(this.user);
    console.log(this.user);
  }

  public enableForm(): void {
    this.accountForm.enable();
  }

  private setUserData(): User {
    const userData = this.getUserData();
    const address = this.setUserAddress();
    const user: User = ({
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      address: address,
    });
    return user;
  }

  private getUserData(): Observable<any> {
    const userId: number = 1;
    return this._userService.getUser(userId);
  }

  private setUserAddress(): Address {
    const address: Address = ({
      street: "",
      localnumber: "",
      postalcode: "",
      city: "",
      country: "",
    });
    return address;
  }

  private updateUserData(user: object): void {
    Object.entries(user).forEach((entry) => {
      console.log(entry)
    });
    this.user.username = this.accountForm.get('username').value;
  }
}
