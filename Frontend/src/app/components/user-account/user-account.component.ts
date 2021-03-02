import {Component, OnInit} from '@angular/core';
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {patternValidator} from "../../validators/patternValidator.validator";
import {BehaviorSubject} from "rxjs";
import {NavbarService} from "../../shared/navbar/navbar.service";
import {User} from "../../models/User";
import {Address} from "../../models/Address";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  editIcon = faEdit;
  isDetailsActive = true;
  isAddressActive = true;
  accountForm: FormGroup;
  addressForm: FormGroup;
  isOpen$: BehaviorSubject<boolean>;
  user: User;

  constructor(
    private _formBuilder: FormBuilder,
    private _navbarService: NavbarService,
  ) { }

  ngOnInit(): void {
    this.addressForm = this.generateAddressForm();
    this.accountForm = this.generateAccountForm();
    this.isOpen$ = this._navbarService.isOpen$;
    this.user = this.setUserData();
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
    console.log('submitted');
  }

  private setUserData(): User {
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
}
