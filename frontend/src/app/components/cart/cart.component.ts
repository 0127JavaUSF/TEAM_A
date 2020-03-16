import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cartservices/cart.service';
import { User } from 'src/app/models/user';
// import { Restraurant } from 'src/app/models/restaurant';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { styles } from '../../models/googleMapStyle';
import { LocationService } from 'src/app/services/locationservice/location.service';
import { UserLocation } from 'src/app/models/UserLocation';
import { SessionService } from 'src/app/services/sessionservices/session.service';
import { foodItem, Order, myUser} from 'src/app/models/orderHistory';
import { HttpClient } from '@angular/common/http';
// import { google } from '@agm/core/services/google-maps-types';
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

  sendOrder: Order = new Order();

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
    private http: HttpClient,
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
        
        console.log(Object.keys(this.cart));
        // // console.log("user: " + this.sessionService.getCurrentUser);
        this.sendOrder.userId = new myUser();
        this.sendOrder.userId.id = 1;
        // this.user.id;
        this.sendOrder.restApiKey = this.rest['name'];
        for(let i = 0; i < Object.keys(this.cart).length; i++) {
          let item = new foodItem()
          item.name = this.cart[i]['foodItem'].name;
          item.itemQuantity = this.cart[i].quantity;
          item.apiKey = this.cart[i]['foodItem'].apiKey;
          this.sendOrder.orderItems.push(item);
        }

        this.sendOrder.method = localStorage.getItem('method');
        this.sendOrder.timestamp = "2019-01-01";
        // Date.now();

        console.log(this.sendOrder);

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


    // navigator.geolocation.watchPosition

  }

  letsSendOrder() {
    console.log(this.sendOrder);
    const url = "http://localhost:9010/order"
    this.http.post<any>(url, this.sendOrder).subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    )
  }

  // getAddress(address) {
  //   let geocoder = new google.maps.Geocode();
  //   geocoder.geocode({ 'address': address }, function (results, status) {
  //     if (status == 'OK') {
  //       console.log(results[0].geometry.location);
  //     } else {
  //       alert('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
    
  // }

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
