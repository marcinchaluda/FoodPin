import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './components/login/login.component';
import {InputErrorPipe} from './pipes/input-error.pipe';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpErrorInterceptor} from "./interceptors/http-error.interceptor";
import {HomeComponent} from './components/home/home.component';
import {LoaderInterceptor} from "./interceptors/loader.interceptor";
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon';
import {AuthorizationGuard} from "./guards/authorization.guard";
import {SharedModule} from "./shared/shared.module";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import { AboutComponent } from './components/about/about.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CombineStatsComponent } from './components/combine-stats/combine-stats.component';
import { DonationsComponent } from './components/donations/donations.component';

@NgModule({
  declarations: [
      AppComponent,
      RegisterComponent,
      LoginComponent,
      HomeComponent,
      AboutComponent,
      StatisticsComponent,
      CombineStatsComponent,
      DonationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSidenavModule,
    MatIconModule,
    SharedModule,
  ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        },
        {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        AuthorizationGuard,
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
