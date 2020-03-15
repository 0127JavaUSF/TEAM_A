import { Injectable } from '@angular/core';
import { UserLocation } from '../../models/UserLocation';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  userLocation = new UserLocation();

  constructor() {}

  currentUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (res) => {
        this.userLocation.latitude = res.coords.latitude;
        this.userLocation.longitude = res.coords.longitude;
      },
      (error) => console.log(error)
    );  
  }

  getUserLongitude() {
    return this.userLocation.longitude;
  }
  
  getUserLatitude() {
    return this.userLocation.latitude;
  }

}
