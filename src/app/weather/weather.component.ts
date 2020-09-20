import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {fetchCurrentWeather} from './weather-actions';
import {AppState} from '../app.module';
import {CurrentConditions} from './weather.service';
import {Observable} from 'rxjs';
import {currentWeatherSelector} from './weather-reducer';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  current$: Observable<CurrentConditions>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(fetchCurrentWeather());
    this.current$ = this.store.pipe(select(currentWeatherSelector));
  }
}
