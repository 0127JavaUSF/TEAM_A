import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  // private baseUrl = '';
  newAddress: string;
  restaurants = [];


  private testUrl = 'https://eatstreet.com/publicapi/v1/restaurant'
  + '/search?access-token=261ad9c0491c92b2&method=both&pickup-radius=20&street-address=12702+Bruce+B+Downs+Blvd,+Tampa,+FL+33612';

  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'x-access-token': '261ad9c0491c92b2'
      // 'Access-Control-Allow-Origin': 'http://localhost:4200',
      // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Access-Token, content-type',

  //   })
  // };

  // private httpHeaders = new HttpHeaders().append('X-Access-Token', '261ad9c0491c92b2').set('Content-Type', 'application/json');

  // private options = {headers: this.httpHeaders,
  //                   withCredentials: true};


  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<any> {
    return this.http.get(this.newAddress);
  }

  loadRestaurantAddress() {
    this.newAddress = localStorage.getItem('address');
  }

  setRestaurantAddress() {
    localStorage.setItem('address', this.newAddress);
  }
  // setRestaurants(): string [] {
  //   this.getRestaurants().subscribe(
  //   (data) => {
  //     this.restaurants = data.restaurants;
  //   }, (error) => console.log(error)
  //   );
  //   return this.restaurants;
  // }
  // result = from(fetch(this.testUrl, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Headers': 'X-Access-Token',
  //     'X-Access-Token': '261ad9c0491c92b2'
  //   },
  //   method: 'GET',
  //   mode: 'no-cors'
  // }));

  // getRestaurants(): Observable<any> {
  //   return this.http.get(this.imgUrl, {responseType: 'blob'});
  // }

}
