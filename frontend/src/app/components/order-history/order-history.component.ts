import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService/user.service';
import { orderHistory } from 'src/app/models/orderHistory';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/sessionservices/session.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: orderHistory[];
  user: User = new User();

  constructor(
    private userService: UserService, 
    private router: Router,
    private sessionService: SessionService) { }

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

    this.userService.getOrderHistory().subscribe(
      data => {
        this.orders = data;
        console.log(this.orders);
      },
      error => (console.log(error)));
  }

  returnToUser() {
    this.router.navigate(['user-details']);
  }

}
