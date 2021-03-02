import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
// @ts-ignore
import {passwordMatchValidator} from "../../validators/passwordMatch.validator";
// @ts-ignore
import {patternValidator} from "../../validators/patternValidator.validator";
import {RegistrationService} from "../../services/registration.service";
import {faAt, faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NavbarService} from "../../shared/navbar/navbar.service";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegistrationService]
})
export class RegisterComponent implements OnInit {
  userIcon = faUser;
  emailIcon = faAt;
  passwordIcon = faLock;
  registrationForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _registrationService: RegistrationService,
    private _router: Router,
    private _toastr: ToastrService,
    private _navbar: NavbarService,
    private _localStorageService: LocalStorageService,
  ) {
  }

  public ngOnInit(): void {
    this.registrationForm = this.generateRegistrationForm();
  }

  public get userName(): AbstractControl {
    return this.registrationForm.get('username');
  }

  public get email(): AbstractControl {
    return this.registrationForm.get('email');
  }

  public get password(): AbstractControl {
    return this.registrationForm.get('password1');
  }

  public get confirmPassword(): AbstractControl {
    return this.registrationForm.get('password2');
  }

  private generateRegistrationForm(): FormGroup {
    return this._formBuilder.group({
      username: [this._localStorageService.getItem('username'),
        Validators.compose([Validators.required, Validators.minLength(6)])],
      email: [this._localStorageService.getItem('email'),
        Validators.compose([Validators.required, Validators.email])],
      password1: [null , Validators.compose([
        Validators.required,
        // consist a number in a password
        patternValidator(/\d/, {hasNumber: true}),
        // consist of uppercase letter in a password
        patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        // consist of lowercase letter in a password
        patternValidator(/[a-z]/, {hasSmallCase: true}),
        Validators.minLength(6),
      ])],
      password2: [null , Validators.compose([Validators.required])],
    }, {validator: passwordMatchValidator});
  }

  public onSubmit(): void  {
    this._registrationService.registerUser$(this.registrationForm.value).subscribe(
      _ => {
        this._toastr.success("Registration successful");
        this._router.navigate(["login"]);
      },
    )
  }

  public homePageRedirect(): void {
    this._navbar.redirectToHomePage();
  }

  public retainValue(event: any): void {
    const key: string = (event.target.id).replace(/([-])/, "");
    this._localStorageService.setItem(key, event.target.value);
  }
}
