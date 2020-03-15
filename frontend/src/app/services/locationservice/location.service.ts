import { Injectable } from '@angular/core';
import { UserLocation } from '../../models/UserLocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private userLocation = new UserLocation();

  constructor() {}

  userCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (result) => {
        this.userLocation.latitude = result.coords.latitude;
        this.userLocation.longitude = result.coords.longitude;
      },
      (error) => console.log(error))
  }

  getUserLocation() {
    this.userCurrentLocation();
    return this.userLocation;
  }

}
