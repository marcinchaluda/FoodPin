import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {LoaderComponent} from './loader/loader.component';
import {NavbarComponent} from './navbar/navbar.component';
import {NavbarService} from './navbar/navbar.service';
import {LoaderService} from './loader/loader.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';
import {DonationComponent} from './donation/donation.component';
import {InputErrorPipe} from '../pipes/input-error.pipe';
import { MostWasteProductsComponent } from './most-waste-products/most-waste-products.component';
import { InfoStatsComponent } from './info-stats/info-stats.component';
import { DonateFoodModalComponent } from './donate-food-modal/donate-food-modal.component';
import {DonateFoodModalService} from './donate-food-modal/donate-food-modal.service';
import {MapComponent} from './map/map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletMarkerClusterModule} from '@asymmetrik/ngx-leaflet-markercluster';

@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    NavbarComponent,
    DonationComponent,
    InputErrorPipe,
    MostWasteProductsComponent,
    InfoStatsComponent,
    DonateFoodModalComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    LeafletModule,
    LeafletMarkerClusterModule
  ],
  providers: [
    NavbarService,
    LoaderService,
    DonateFoodModalService,
  ],
  exports: [
    HeaderComponent,
    LoaderComponent,
    NavbarComponent,
    DonationComponent,
    InputErrorPipe,
    MostWasteProductsComponent,
    InfoStatsComponent,
    DonateFoodModalComponent,
    MapComponent,
  ]
})
export class SharedModule { }
