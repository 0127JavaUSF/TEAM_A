import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService/user.service';
import { orderHistory } from 'src/app/models/orderHistory';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: orderHistory[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getOrderHistory().subscribe(
      data => {
        this.orders = data;
        console.log(this.orders);
      },
      error => (console.log(error)));
  }

  returnToUser() {
    this.router.navigate(['user']);
  }

}
