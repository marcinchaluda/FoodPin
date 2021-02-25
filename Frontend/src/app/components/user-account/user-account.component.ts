import { Component, OnInit } from '@angular/core';
import {faEdit} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  editIcon = faEdit;
  isDetailsActive = true;
  isAddressActive = true;

  constructor() { }

  ngOnInit(): void {
  }

}
