import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {SharedModule} from '../shared.module';


@NgModule({
  declarations: [MapComponent],
  exports: [
    MapComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    LeafletModule,
    SharedModule,
  ]
})
export class MapModule { }
