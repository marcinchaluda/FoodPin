import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AuthorizationGuard} from './guards/authorization.guard';
import {DonationComponent} from './shared/donation/donation.component';
import {AboutComponent} from './components/about/about.component';
import {StatisticsComponent} from './components/statistics/statistics.component';
import {CombineStatsComponent} from './components/combine-stats/combine-stats.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'account',
    loadChildren: () => import('./components/user-account/user-account.module').then(m => m.UserAccountModule),
    canLoad: [AuthorizationGuard],
  },
  {path: 'donation', component: DonationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
