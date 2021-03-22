import {Component, OnInit} from '@angular/core';
import {faEdit, faSave} from '@fortawesome/free-solid-svg-icons';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {patternValidator} from '../../validators/patternValidator.validator';
import {BehaviorSubject} from 'rxjs';
import {NavbarService} from '../../shared/navbar/navbar.service';
import {Address} from '../../models/Address';
import {UserService} from '../../services/user.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../models/User';
import {ToastrService} from 'ngx-toastr';

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
    private _toastr: ToastrService,
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
      username: [this.user.username , Validators.compose([Validators.required, Validators.minLength(6)])],
      firstname: [this.user.firstname],
      lastname: [this.user.lastname],
      email: [this.user.email , Validators.compose([Validators.required, Validators.email])],
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
    if (this.isReadyToUpdate()) {
      this.updateUserData();
      this.accountForm.disable();
      this.isDisabled = true;
    } else {
      this._toastr.error('Invalid data in a form');
    }
  }

  public enableForm(): void {
    this.isDisabled = false;
    this.accountForm.enable();
  }

  private updateUserData(): void {
    const userId = this._localStorageService.getItem('userId');
    this._userService.updateUser(userId, this.accountForm.value);
  }

  public get username(): AbstractControl {
    return this.accountForm.get('username');
  }

  public get firstname(): AbstractControl {
    return this.accountForm.get('firstname');
  }

  public get lastname(): AbstractControl {
    return this.accountForm.get('lastname');
  }

  public get email(): AbstractControl {
    return this.accountForm.get('email');
  }

  public get phone(): AbstractControl {
    return this.accountForm.get('phone');
  }

  public get street(): AbstractControl {
    return this.accountForm.get('address').get('street');
  }

  public get localnumber(): AbstractControl {
    return this.accountForm.get('address').get('localnumber');
  }

  public get postalcode(): AbstractControl {
    return this.accountForm.get('address').get('postalcode');
  }

  public get city(): AbstractControl {
    return this.accountForm.get('address').get('city');
  }

  public get country(): AbstractControl {
    return this.accountForm.get('address').get('country');
  }

  public isReadyToUpdate(): boolean {
    let canBeUpdated = true;
    Object.keys(this.accountForm.value).forEach(key => {
      if (this.accountForm.get(key).errors) {
        canBeUpdated = false;
      }
    });
    return canBeUpdated;
  }
}
