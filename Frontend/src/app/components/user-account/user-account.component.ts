import {Component, OnInit} from '@angular/core';
import {faEdit, faSave} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {patternValidator} from '../../validators/patternValidator.validator';
import {BehaviorSubject} from 'rxjs';
import {NavbarService} from '../../shared/navbar/navbar.service';
import {Address} from '../../models/Address';
import {UserService} from '../../services/user.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  editIcon = faEdit;
  saveIcon = faSave;
  accountForm: FormGroup;
  isOpen$: BehaviorSubject<boolean>;
  isDisabled = true;
  private user: User;
  private address: Address;

  constructor(
    private _formBuilder: FormBuilder,
    private _navbarService: NavbarService,
    private _userService: UserService,
    private _localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this._navbarService.isOpen$;
    this.user = this._userService.userDetails;
    this.accountForm = this.generateAccountForm();
    this.accountForm.disable();
  }

  private generateAccountForm(): FormGroup {
    this.address = this.user.address;
    return this._formBuilder.group({
      username: [this.user.username , Validators.compose([Validators.minLength(6)])],
      firstname: [this.user.firstname],
      lastname: [this.user.lastname],
      email: [this.user.email , Validators.compose([Validators.email])],
      phone: [this.user.phone , patternValidator(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, {invalidNumber: true})],
      address: this._formBuilder.group({
        street: [this.address.street],
        localnumber: [this.address.localnumber],
        postalcode: [this.address.postalcode, patternValidator(/\d{2}-\d{3}/, {invalidPostalCode: true})],
        city: [this.address.city],
        country: [this.address.country],
      }),
    });
  }

  public onSubmit(): void {
    this.isDisabled = true;
    this.accountForm.disable();
    this.updateUserData();
  }

  public enableForm(): void {
    this.isDisabled = false;
    this.accountForm.enable();
  }

  private updateUserData(): void {
    console.log(this.accountForm.value);
  }
}
