import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserComponent} from './components/user/user.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'restaurants', component: RestaurantComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'create-account', component: CreateUserComponent},
  {path: 'restaurants/:id', component: MenuComponent},
  {path: 'user', component: UserComponent},
  {path: 'cart', component: CartComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
// export const routingComponents = [ RestaurantComponent, LandingComponent ];
