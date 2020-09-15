import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {WeatherService} from './weather.service';
import {FETCH_CURRENT_WEATHER, FETCH_CURRENT_WEATHER_SUCCESS} from './weather_actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';


@Injectable()
// @ts-ignore
export class WeatherEffects {
  fetchCurrentConditions$ = createEffect(() => this.actions$.pipe(
    ofType(FETCH_CURRENT_WEATHER),
    mergeMap(() => this.weatherService.getCurrentConditions()
      .pipe(
        map(response => ({type: FETCH_CURRENT_WEATHER_SUCCESS, response: response})),
        catchError(() => EMPTY)
      ))
  ));

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {
  }
}
