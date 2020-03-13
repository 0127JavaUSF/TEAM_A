import { Injectable } from '@angular/core';
import { Item, Food } from 'src/app/models/item';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  /**
   * for testing purposes. Should hold entire cart from localStorage
   */
  cart;

  constructor() { }

  /**
   * 
   * @method addItem adds item to cart 
   */

  /**
   * @method loadCart returns TS Object Cart 
   * that has itemApiKey pointing to object that contains
   * itemApiKey and quantity
   */
  loadCart(): Observable<any> {
    return of(this.cart = JSON.parse(localStorage.getItem('cart')));
  }

  /**
   * @method modifyCart adds or removes from cart given Item object and quantity
   * @param item 
   * @param quantity 
   */
  modifyCart(food: Food, quantity: number): void {

    let myCart = JSON.parse(localStorage.getItem('cart'));
    console.log("Cart: " + myCart);
    // we first check if key 'itemApiKey' has item and quantity

    const apiKey = food.apiKey;

    if(myCart[apiKey] === undefined) {
      if(quantity > 0) {
        myCart[apiKey] = {
          "foodItem": food,
          "quantity": quantity
        }
      } else {
        // TODO: for testing only
        console.log("Quantity < 0 not allowed");
      }

    } else {
      console.log(myCart["123"]);

      // let newQuant = myCart[`${item.itemApiKey}`].quantity += quantity;
      // if(newQuant < 0) {
      //   newQuant = 0;
      // }
      myCart[`${food.apiKey}`].quantity = quantity; 
      //newQuant;
    
    }

    localStorage.setItem('cart', JSON.stringify(myCart));
    this.loadCart();
  
  }

  emptyCart(): void {
    localStorage.removeItem('cart');
    this.loadCart();
  }

}
