import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from 'src/app/services/RestaurantService/RestaurantService.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/sessionservices/session.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  user: User = new User();
  address = '';
  distance = 2;
  constructor(private httpClient: HttpClient, private restaurantService: RestaurantService, private router: Router,
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

    localStorage.removeItem('address');
    localStorage.removeItem('method');
    localStorage.removeItem('radius');

  }

  search() {
    // takes user address and fixes it to api standard
    const replace = / /gi;
    const newAddress = this.address.replace(replace, '+');
    this.restaurantService.method = 'delivery';
    this.restaurantService.pickupRadius = this.distance;
    this.restaurantService.newAddress = newAddress;
  }

  finishTypingEvent() {
    this.search();
    this.router.navigate(['restaurants']);
  }
}
