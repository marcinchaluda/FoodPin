import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserAccountRoutingModule} from './user-account-routing.module';
import {UserAccountComponent} from './user-account.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LoaderService} from "../../shared/loader/loader.service";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    UserAccountComponent,
  ],
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [LoaderService],
})
export class UserAccountModule { }
