import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { passwordMatchValidator } from "../../validators/passwordMatch.validator";
import {patternValidator} from "../../validators/patternValidator.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
      userName: [null , Validators.compose([Validators.required, Validators.minLength(3)])],
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

  registerUser() {
    console.log(this.registrationForm.value);
  }
}
