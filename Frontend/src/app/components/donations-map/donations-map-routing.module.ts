import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonationsMapComponent } from './donations-map.component';

const routes: Routes = [
  { path: '', component: DonationsMapComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationsMapRoutingModule { }
