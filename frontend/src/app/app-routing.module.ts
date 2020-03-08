import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CreateUserComponent } from './components/create-user/create-user.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'rest', component: RestaurantComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'createAccount', component: CreateUserComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [ RestaurantComponent, LandingComponent ];
