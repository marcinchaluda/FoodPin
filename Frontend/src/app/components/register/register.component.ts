import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// @ts-ignore
import {passwordMatchValidator} from "../../validators/passwordMatch.validator";
// @ts-ignore
import {patternValidator} from "../../validators/patternValidator.validator";
import {RegistrationService} from "../../services/registration.service";
import {faUser, faAt, faLock} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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
    ) { }

  ngOnInit(): void {
    this.registrationForm = this.generateRegistrationForm();
  }

  get userName() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password1');
  }

  get confirmPassword() {
    return this.registrationForm.get('password2');
  }

  private generateRegistrationForm(): FormGroup {
    return this._formBuilder.group({
      username: [null , Validators.compose([Validators.required, Validators.minLength(6)])],
      email: [null , Validators.compose([Validators.required, Validators.email])],
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

  onSubmit()  {
    console.log(this.registrationForm.value);
    this._registrationService.registerUser(this.registrationForm.value).subscribe(
      _ => this._router.navigate(["login"]),
      error => {
        this._toastr.error(`Error! ${error.message}`);
      },
    )
  }
}
