import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DonationsMapRoutingModule} from './donations-map-routing.module';
import {DonationsMapComponent} from './donations-map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletMarkerClusterModule} from '@asymmetrik/ngx-leaflet-markercluster';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [DonationsMapComponent],
  imports: [
    CommonModule,
    DonationsMapRoutingModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    SharedModule,
  ]
})
export class DonationsMapModule { }
