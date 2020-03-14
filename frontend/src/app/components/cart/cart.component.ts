import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cartservices/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart = {};
  objectKeys = Object.keys;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.loadCart().subscribe(
      (cart) => {
        cart = Object.values(cart);
        // localStorage will have food with quantity 0 when 
        // customer removes it
        this.cart = cart.filter(ele => ele.quantity > 0);
      },
      (error) => console.log(error),
    )
  }

}
