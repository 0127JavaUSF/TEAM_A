import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ImgData {
  // restaurants: [];
}

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
      'X-Access-Token': '261ad9c0491c92b2'
    })
  };

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<any> {
    return this.http.get(this.testUrl, this.httpOptions);
  }

  // getRestaurants(): Observable<any> {
  //   return this.http.get(this.imgUrl, {responseType: 'blob'});
  // }

}
