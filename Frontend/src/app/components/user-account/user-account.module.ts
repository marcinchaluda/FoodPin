import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountRoutingModule } from './user-account-routing.module';
import { UserAccountComponent } from './user-account.component';
import { HeaderComponent } from '../shared/header/header.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    UserAccountComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    FontAwesomeModule,
  ]
})
export class UserAccountModule { }
