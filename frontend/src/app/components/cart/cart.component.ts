import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cartservices/cart.service';
import { User } from 'src/app/models/user';
import { Restraurant } from 'src/app/models/restaurant';

/**
 * The Cart component relies on: 
 * 
 * 1. User Information (Full Address, First and Last Name)
 * 2. Restaurant Name
 * 3. Food Items (Item name, Quantity)
 * 
 */

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  /**
   * These are dummies. Later, we populate these through apt services
   */
  
  user = {};
  rest = {};

  time = "Approximately 30 minutes";
  payment = "PayPal";

  cart = {};

  objectKeys = Object.keys;

  delivery: boolean;

  deliverySelected = true;
  pickupSelected = false;

  constructor(private cartService: CartService) {

    this.user['firstName'] = "Abby";
    this.user['lastName'] = "Adams";
    this.user['address'] = "12702 Bruce B Downs Blvd, 1420, Tampa, FL 33612";
    this.user['payment'] = "Paypal";

    this.rest['name'] = "Denny's";
    this.rest['delivery'] = "$3.99";
    this.rest['address'] =  "120-21 71st Street, Brynt Park, NY, NY 11001"

    this.delivery = true;

   }

  ngOnInit(): void {
    this.cartService.loadCart().subscribe(
      (cart) => {
        cart = Object.values(cart);
        // localStorage will have food with quantity 0 when
        // customer removes it
        this.cart = cart.filter(ele => ele.quantity > 0);
      },
      (error) => console.log(error),
    );
  }

  displayDeliveryOption(selection: string) {
    if(selection === 'delivery') {
      if(this.delivery === true) {
        return;
      } else {
        this.delivery = true;
      }
    }

    if(selection === 'pickup') {
      if(this.delivery === false) {
        return;
      } else {
        this.delivery = false;
      }
    }
  }

}
