import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// @ts-ignore
import {passwordMatchValidator} from "../../validators/passwordMatch.validator";
// @ts-ignore
import {patternValidator} from "../../validators/patternValidator.validator";
import {RegistrationService} from "../../services/registration.service";
import {faUser, faAt, faLock} from "@fortawesome/free-solid-svg-icons";

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

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.registrationForm = this.generateRegistrationForm();
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  private generateRegistrationForm(): FormGroup {
    return this.formBuilder.group({
      userName: [null , Validators.compose([Validators.required, Validators.minLength(6)])],
      email: [null , Validators.compose([Validators.required, Validators.email])],
      password: [null , Validators.compose([
        Validators.required,
        // consist a number in a password
        patternValidator(/\d/, {hasNumber: true}),
        // consist of uppercase letter in a password
        patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        // consist of lowercase letter in a password
        patternValidator(/[a-z]/, {hasSmallCase: true}),
        Validators.minLength(6),
      ])],
      confirmPassword: [null , Validators.compose([Validators.required])],
    }, {validator: passwordMatchValidator});
  }

  onSubmit()  {
    console.log(this.registrationForm.value);
    this.registrationService.registerUser(this.registrationForm.value).subscribe(
      response => console.log('Success!', response),
      error => console.log('Error!', error),
    )
  }
}
