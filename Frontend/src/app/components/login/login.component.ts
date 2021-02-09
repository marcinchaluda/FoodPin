import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {patternValidator} from "../../validators/patternValidator.validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.generateLoginForm();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  private generateLoginForm() {
    return this.formBuilder.group({
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
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }
}
