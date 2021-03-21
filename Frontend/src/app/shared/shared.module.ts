import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {LoaderComponent} from "./loader/loader.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {NavbarService} from "./navbar/navbar.service";
import {LoaderService} from "./loader/loader.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {DonationComponent} from './donation/donation.component';
import {InputErrorPipe} from '../pipes/input-error.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    NavbarComponent,
    DonationComponent,
    InputErrorPipe,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
  ],
  providers: [
    NavbarService,
    LoaderService,
  ],
  exports: [
    HeaderComponent,
    LoaderComponent,
    NavbarComponent,
    DonationComponent,
    InputErrorPipe,
  ]
})
export class SharedModule { }
