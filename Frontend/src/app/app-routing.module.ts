import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AuthorizationGuard} from './guards/authorization.guard';
import {AboutComponent} from './components/about/about.component';
import {StatisticsComponent} from './components/statistics/statistics.component';
import {DonationsComponent} from './components/donations/donations.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {InitDataResolver} from './resolvers/init-data.resolver';
import {CanActivateGuard} from './guards/can-activate.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'statistics', component: StatisticsComponent},
  {
    path: 'donate-food',
    loadChildren: () => import('./components/donate-food/donate-food.module').then(m => m.DonateFoodModule),
    resolve: { initDataResolver: InitDataResolver },
    canActivate: [CanActivateGuard],
    },
  {
    path: 'account',
    loadChildren: () => import('./components/user-account/user-account.module').then(m => m.UserAccountModule),
    canLoad: [AuthorizationGuard],
  },
  {path: 'donations', component: DonationsComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
