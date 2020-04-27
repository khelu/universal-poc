import {Injectable} from '@angular/core';

import {IPosition} from '../../models/db/position';
import {ApiService} from '../api/api.service';
import {ApiUrlEnum} from '../../enums/api-url.enum';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private readonly apiService: ApiService) { }

  public getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((geolocation) => {
        const latitude = geolocation.coords.latitude;
        const longitude = geolocation.coords.longitude;
        const position: IPosition = {latitude: latitude, longitude: longitude};
        this.setClientGeolocation(position);
      });
    } else {
      console.log('No support for geolocation');
    }
  }

  public setClientGeolocation(position: IPosition) {
    if (position) {
      this.apiService.post$(ApiUrlEnum.SET_CLIENT_GEOLOCATION, position).subscribe();
    }
  }

  public initClientGeolocation() {
    this.getLocation();
  }
}
