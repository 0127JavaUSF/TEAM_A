import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LandingComponent } from './components/landing/landing.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './components/user/user.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { MenuComponent } from './components/menu/menu.component';
=======
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
>>>>>>> cf51170070f237560bdd63472ba5c146d77810c2


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    LandingComponent,
    NavbarComponent,
    RestaurantComponent,
<<<<<<< HEAD
    MenuComponent
=======
    SignInComponent,
    CreateUserComponent
>>>>>>> cf51170070f237560bdd63472ba5c146d77810c2
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
