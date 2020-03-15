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

  deliveryFee = 3.99;
  subtotal = parseFloat((100 + this.deliveryFee).toFixed(2));
  taxAndFees = parseFloat((0.08 * this.subtotal).toFixed(2));
  totalAmount = this.taxAndFees + this.subtotal + this.deliveryFee;

  deliverySelected = true;

  pickupClass;
  deliveryClass;

  pickupDefaultClass = "option-container";
  pickupActiveClass = "option-container delivery-active";
  
  deliveryDefaultClass = "delivery-option-container option-container";
  deliveryActiveClass = "delivery-option-container option-container delivery-active";

  constructor(private cartService: CartService) {

    this.user['firstName'] = "Abby";
    this.user['lastName'] = "Adams";
    this.user['address'] = "12702 Bruce B Downs Blvd, 1420, Tampa, FL 33612";
    this.user['payment'] = "Paypal";

    this.rest['name'] = "Denny's";
    this.rest['delivery'] = "$3.99";
    this.rest['address'] =  "120-21 71st Street, Brynt Park, NY, NY 11001"

    this.pickupClass = this.pickupDefaultClass;
    this.deliveryClass = this.deliveryActiveClass;

   }

  ngOnInit(): void {
    this.cartService.loadCart().subscribe(
      (cart) => {
        cart = Object.values(cart);
        // localStorage will have food with quantity 0 when
        // customer removes it
        this.cart = cart.filter(ele => ele.quantity > 0);
        console.log(this.cart);
      },
      (error) => console.log(error),
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
    if(selection === 'delivery') {
      this.deliveryChosen();
    }

    if(selection === 'pickup') {
      this.pickupChosen();
    }
  }

}