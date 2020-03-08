import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  // private baseUrl = '';
  private testUrl = 'https://eatstreet.com/publicapi/v1/restaurant'
  + '/search?method=both&pickup-radius=20&street-address=12702+Bruce+B+Downs+Blvd,+Tampa,+FL+33612';

  private imgUrl = 'https://static.eatstreet.com/assets/images/restaurant_logos/bawarchi-biryani-point-38636_1478555896705.png';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Access-Token': '261ad9c0491c92b2',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Access-Token, content-type',
      'Access-Control-Allow-Methods': '*'
    })
  };

  // private httpHeaders = new HttpHeaders().append('X-Access-Token', '261ad9c0491c92b2').set('Content-Type', 'application/json');

  // private options = {headers: this.httpHeaders,
  //                   withCredentials: true};

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<any> {
    return this.http.get(this.testUrl, this.httpOptions);
  }
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
