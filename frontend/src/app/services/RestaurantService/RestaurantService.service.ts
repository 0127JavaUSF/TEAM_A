import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  newAddress: string;
  pickupRadius: number;
  method: 'delivery' | 'pickup';
  url: any;


  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<any> {
    this.url = 'https://eatstreet.com/publicapi/v1/restaurant'
  + '/search?access-token=261ad9c0491c92b2&method=' + this.method + '&pickup-radius=' + this.pickupRadius +
    '&street-address=' + this.newAddress;
    return this.http.get(this.url);
  }

  loadRestaurantAddress() {
    this.newAddress = localStorage.getItem('address');
  }

  setRestaurantAddress() {
    localStorage.setItem('address', this.newAddress);
  }

  getDeliveryRestaurants(): Observable<any> {
    this.url = 'https://eatstreet.com/publicapi/v1/restaurant'
    + '/search?access-token=261ad9c0491c92b2&method=' + this.method + '&pickup-radius=' + this.pickupRadius +
      '&street-address=' + this.newAddress;
    return this.http.get(this.url);
  }

  getPickupRestaurants(): Observable<any> {
    this.url = 'https://eatstreet.com/publicapi/v1/restaurant'
    + '/search?access-token=261ad9c0491c92b2&method=' + this.method + '&pickup-radius=' + this.pickupRadius +
      '&street-address=' + this.newAddress;
    return this.http.get(this.url);
  }

  getNewRestaurants(): Observable<any> {
    this.url = 'https://eatstreet.com/publicapi/v1/restaurant'
    + '/search?access-token=261ad9c0491c92b2&method=' + this.method + '&pickup-radius=' + this.pickupRadius +
      '&street-address=' + this.newAddress;
    return this.http.get(this.url);
  }


}
