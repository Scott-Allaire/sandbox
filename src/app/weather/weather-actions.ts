import {Action, createAction, props} from '@ngrx/store';
import {CurrentConditions} from './weather.service';

export const FETCH_CURRENT_WEATHER = '[weather] FETCH_CURRENT_WEATHER';
export const FETCH_CURRENT_WEATHER_SUCCESS = '[weather] FETCH_CURRENT_WEATHER_SUCCESS';
export const FETCH_CURRENT_WEATHER_FAILURE = '[weather] FETCH_CURRENT_WEATHER_FAILURE';

export const fetchCurrentWeather = createAction(FETCH_CURRENT_WEATHER);
export const fetchCurrentWeatherSuccess = createAction(FETCH_CURRENT_WEATHER_SUCCESS, props<{ response: CurrentConditions }>());
export const fetchCurrentWeatherFailure = createAction(FETCH_CURRENT_WEATHER_FAILURE, props<{ message: string }>());
