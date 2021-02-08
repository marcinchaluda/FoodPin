import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { passwordValidator } from "../../validators/password.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {validator: passwordValidator});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

}
