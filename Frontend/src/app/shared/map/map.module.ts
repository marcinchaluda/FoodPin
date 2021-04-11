import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {SharedModule} from '../shared.module';
import {LeafletMarkerClusterModule} from '@asymmetrik/ngx-leaflet-markercluster';


@NgModule({
  declarations: [MapComponent],
  exports: [
    MapComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    SharedModule,
  ]
})
export class MapModule { }
