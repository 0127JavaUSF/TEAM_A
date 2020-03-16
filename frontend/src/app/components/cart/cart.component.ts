import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cartservices/cart.service';
import { User } from 'src/app/models/user';
import { Restraurant } from 'src/app/models/restaurant';
import { AgmCoreModule } from '@agm/core';
import { styles } from '../../models/googleMapStyle';
import { LocationService } from 'src/app/services/locationservice/location.service';
import { async } from '@angular/core/testing';
import { UserLocation } from 'src/app/models/UserLocation';
import { SessionService } from 'src/app/services/sessionservices/session.service';
/**
 * The Cart component relies on:
 *
 * 1. User Information (Full Address, First and Last Name)
 * 2. Restaurant Name
 * 3. Food Items (Item name, Quantity)
 *
 */

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  /**
   * These are dummies. Later, we populate these through apt services
   */

  mapStyles = styles;

  user: User = new User();
  rest = {};

  sendOrder = {}

  time = "Approximately 30 minutes";
  payment = "PayPal";

  cart = {};
  objectKeys = Object.keys;
  restaurant;

  subtotal = 0.0;
  
  taxAndFees;
  
  totalAmount = 0.0;

  total;

  deliverySelected = true;

  pickupClass;
  deliveryClass;

  pickupDefaultClass = "option-container";
  pickupActiveClass = "option-container delivery-active";

  deliveryDefaultClass = "delivery-option-container option-container";
  deliveryActiveClass = "delivery-option-container option-container delivery-active";

  lat = 28.054940;
  long = -82.440440;

  userLocation = new UserLocation();

  constructor(
    private cartService: CartService,
    private locationService: LocationService,
    private sessionService: SessionService,
    ) {

    this.user['payment'] = "Paypal";

    this.pickupClass = this.pickupDefaultClass;
    this.deliveryClass = this.deliveryActiveClass;

   }

  ngOnInit(): void {

    if (!this.sessionService.isLoggedIn()) {
      this.sessionService.fetchCurrentUser().subscribe(
        (data) => {
          this.sessionService.receiveUserData(data);
          this.user = this.sessionService.getCurrentUser();
        },
        (error) => {
          console.log(error);
          this.sessionService.ensureLoggedIn();
        }
      )
    }

    this.cartService.loadCart().subscribe(
      (cart) => {
        
        cart = Object.values(cart);
        // localStorage will have food with quantity 0 when
        // customer removes it
        this.cart = cart.filter(ele => { 
          if(ele.quantity > 0) {
            this.subtotal = this.subtotal + (ele['foodItem'].basePrice * ele.quantity);
            return true;
          }
          return false;
        });

        this.rest['name'] = localStorage.getItem('restName');
        this.rest['address'] = localStorage.getItem('restAddress');
        this.rest['delivery'] = localStorage.getItem('deliveryPrice');
        if(this.rest['delivery'] === "undefined") {
            this.rest['delivery'] = "0";
        }
      
        this.taxAndFees = 0.08 * this.subtotal;
        this.total = (parseFloat(this.taxAndFees + this.subtotal + this.rest['delivery'])).toFixed(2);
        this.taxAndFees = this.taxAndFees.toFixed(2);
        this.subtotal = parseFloat(this.subtotal.toFixed(2));
      },
      (error) => console.log(error),
    );

    // TODO Need to relocate somewhere
    // this.locationService.currentUserLocation();
    navigator.geolocation.getCurrentPosition(
      (res) => {
        this.userLocation.latitude = res.coords.latitude;
        this.userLocation.longitude = res.coords.longitude;
      },
      (error) => console.log(error)
    );

  }

  deliveryChosen() {
    this.deliverySelected = true;
    this.deliveryClass = this.deliveryActiveClass;
    this.pickupClass = this.pickupDefaultClass;
  }

  pickupChosen() {
    this.deliverySelected = false;
    this.pickupClass = this.pickupActiveClass;
    this.deliveryClass = this.deliveryDefaultClass;
  }

  displayDeliveryOption(selection: string) {
    if (selection === 'delivery') {
      this.deliveryChosen();
    }

    if (selection === 'pickup') {
      this.pickupChosen();
    }
  }

}
