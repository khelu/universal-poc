import { Injectable } from '@angular/core';
import {ApiService} from '../api/api.service';
import {Observable} from 'rxjs';
import {ICity} from '../../models/db/city';
import {ApiUrlEnum} from '../../enums/api-url.enum';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private readonly apiService: ApiService) { }

  public findCities(find: string): Observable<ICity[]> {
    const findLowerCase = find.toLowerCase();
    return this.apiService.get$(ApiUrlEnum.FIND_CITIES, {find: findLowerCase});
  }
}
