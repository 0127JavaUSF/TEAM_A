import { Injectable } from '@angular/core';
import { UserLocation } from '../../models/UserLocation';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private userLocation = new UserLocation();

  constructor() {}

  userCurrentLocation(): Observable<any> {
    return of(navigator.geolocation.getCurrentPosition(
      (result) => {
        this.userLocation.latitude = result.coords.latitude;
        this.userLocation.longitude = result.coords.longitude;
      },
      (error) => console.log(error))
      )
  }

  getUserLocation(): Observable<any> {
    return this.userCurrentLocation();
  }

  getUserLongitude() {
    return this.userLocation.longitude;
  }
  
  getUserLatitude() {
    return this.userLocation.latitude;
  }

}
