import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DonateFoodComponent} from './donate-food.component';

const routes: Routes = [
  {
    path: '',
    component: DonateFoodComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonateFoodRoutingModule { }
