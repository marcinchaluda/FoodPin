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
import { LoaderComponent } from './components/shared/loader/loader.component';
import {LoaderService} from "./services/loader.service";
import {LoaderInterceptor} from "./interceptors/loader.interceptor";
import { NavbarComponent } from './components/shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    InputErrorPipe,
    HomeComponent,
    LoaderComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
