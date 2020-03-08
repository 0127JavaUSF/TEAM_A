import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'rest', component: RestaurantComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [ RestaurantComponent, LandingComponent ]