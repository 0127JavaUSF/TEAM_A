import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  /**
   * MenuService keeps track of the current restaurant clicked by User.
   * When Click occurs: We set the object currentMenu to the result of
   * the GET request to Food API which returns the Menu for specified restaurant.
   * To do so, we need 'apiKey' from a specific restaurant and append that to our 
   * URL and send the GET request. Vuala.
   */

  currentMenu: String[];
  currentRestKey: string;

  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'X-Access-Token': '261ad9c0491c92b2'
  //   })
  // };

  constructor( private http: HttpClient ) { }

  // getCurrentRestKey(): String {
  //   return this.currentRestKey;
  // }

  // setCurrentRestaurantKey(currentRestKey: string): void {
  //   this.currentRestKey = currentRestKey;
  // }

  // getCurrentMenu(): String[] {
  //   return this.currentMenu;
  // }

  // setCurrentMenu(currentMenu: String[]): void {
  //   this.currentMenu = currentMenu;
  // }
  
  /**
   * getMenu() returns type Observable that
   * includes array of food objects  
   */

  getMenu(): Observable<any> {
    // https://eatstreet.com/publicapi/v1/restaurant/da4da700123e4b45f15b4f2e73e76180e4e62501343dc052/menu
    if(this.currentRestKey.length != 0) {
      return this.http.get(`https://eatstreet.com/publicapi/v1/restaurant/${this.currentRestKey}/menu?access-token=261ad9c0491c92b2`);
    } else {
      console.log("Click on the restaurant.");
    }
  }

}
