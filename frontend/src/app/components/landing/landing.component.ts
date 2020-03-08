import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestaurantService } from 'src/app/services/RestaurantService/RestaurantService.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  address = '';
  constructor(private httpClient: HttpClient, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
  }

  search() {
    // takes user address and fixes it to api standard
    const replace = / /gi;
    const newAddress = this.address.replace(replace, '+');
    const api = 'https://eatstreet.com/publicapi/v1/restaurant'
    + '/search?access-token=261ad9c0491c92b2&method=both&pickup-radius=20&street-address=' + newAddress;
    console.log(api);
    this.restaurantService.newAddress = api;
  }
}
