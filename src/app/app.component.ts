import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {Constant} from './models/constant/constant';
import {ICity} from './models/db/city';
import {TitleService} from './providers/title/title.service';
import {CityService} from './providers/city/city.service';
import {LocationService} from './providers/location/location.service';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _unsubscribe: Subject<any> = new Subject<any>();

  title = Constant.BROWSER_TAB_TITLE;

  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  constructor(private readonly titleService: TitleService,
              private readonly locationService: LocationService,
              private readonly cityService: CityService) {}

  ngOnInit() {

    this.locationService.initClientGeolocation();

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => {
          if (value) {
            return this.cityService.findCities(value)
              .pipe(map((cities: ICity[]) => cities.map((c: ICity) => c.city + ', ' + c.admin_name + ', ' + c.country)));
          } else {
            // close panel, clear results
            this.autocomplete.closePanel();
            return of([]);
          }
        })
      );
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
