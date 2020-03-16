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
import { MenuComponent } from './components/menu/menu.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserService } from './services/UserService/user.service';
import { CartComponent } from './components/cart/cart.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { PickupComponent } from './components/pickup/pickup.component';
import { AgmCoreModule } from '@agm/core';
import { google } from '@agm/core/services/google-maps-types';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    LandingComponent,
    NavbarComponent,
    RestaurantComponent,
    MenuComponent,
    SignInComponent,
    CreateUserComponent,
    CartComponent,
    OrderHistoryComponent,
    DeliveryComponent,
    PickupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFCwp_Ef8hDVvIEsqXcnowl78_iI7kRU4'
    }),
    // google,

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
