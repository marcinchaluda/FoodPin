import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    email: [''],
    password: [''],
    confirmPassword: [''],
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

}
