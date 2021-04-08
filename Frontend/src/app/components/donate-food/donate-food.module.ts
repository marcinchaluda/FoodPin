import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LoaderService} from '../../shared/loader/loader.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {DonateFoodComponent} from './donate-food.component';
import {DonateFoodRoutingModule} from './donate-food-routing.module';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {UserAccountModule} from '../user-account/user-account.module';
import {SingularPluralPipe} from '../../pipes/singular-plural.pipe';

@NgModule({
  declarations: [
    DonateFoodComponent,
    SingularPluralPipe,
  ],
  imports: [
    CommonModule,
    DonateFoodRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSliderModule,
    FormsModule,
    UserAccountModule,
  ],
  providers: [LoaderService],
  exports: [
    SingularPluralPipe,
  ]
})
export class DonateFoodModule { }
