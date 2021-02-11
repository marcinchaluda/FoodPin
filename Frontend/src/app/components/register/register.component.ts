import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { passwordMatchValidator } from "../../validators/passwordMatch.validator";
import {patternValidator} from "../../validators/patternValidator.validator";
import {RegistrationService} from "../../services/registration.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService) { }

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
    return this.formBuilder.group({
      username: [null , Validators.compose([Validators.required, Validators.minLength(3)])],
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

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log(this.registrationForm);
    this.registrationService.registerUser(this.registrationForm.value).subscribe(
      response => console.log('Success!', response),
      error => console.log('Error!', error));
  }
}
