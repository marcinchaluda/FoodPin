import { Component, OnInit } from '@angular/core';
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {patternValidator} from "../../validators/patternValidator.validator";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  editIcon = faEdit;
  isDetailsActive = true;
  isAddressActive = true;
  accountForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.accountForm = this.generateAccountForm();
  }

  private generateAccountForm() {
    return this._formBuilder.group({
      username: [null , Validators.compose([Validators.minLength(6)])],
      firstname: [null],
      lastname: [null],
      email: [null , Validators.compose([Validators.email])],
      phone: [null , patternValidator(/^[+]*[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/, {invalidNumber: true})],
      address: this._formBuilder.group({
        street: [null],
        localnumber: [null],
        postalcode: [null, patternValidator(/\d{2}-\d{3}/, {invalidPostalCode: true})],
        city: [null],
        country: [null],
      }),
    });
  }
}
