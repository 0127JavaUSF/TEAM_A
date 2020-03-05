import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';

const routes: Routes = [
  {path: '', component: NavbarComponent},
  {path: 'rest', component: RestaurantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [ NavbarComponent, RestaurantComponent ]