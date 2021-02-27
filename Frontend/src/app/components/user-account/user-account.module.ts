import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserAccountRoutingModule} from './user-account-routing.module';
import {UserAccountComponent} from './user-account.component';
import {HeaderComponent} from '../shared/header/header.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LoaderService} from "../../services/loader.service";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    UserAccountComponent,
    HeaderComponent,
  ],
    imports: [
        CommonModule,
        UserAccountRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
    ],
  providers: [LoaderService],
})
export class UserAccountModule { }
