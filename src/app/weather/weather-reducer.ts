import {CurrentConditions} from './weather.service';
import {createReducer, on} from '@ngrx/store';
import {fetchCurrentWeatherFailure, fetchCurrentWeatherSuccess} from './weather-actions';
import {AppState} from '../app.module';

export const initialState: CurrentConditions = {};

const _weatherReducer = createReducer(
  initialState,
  on(fetchCurrentWeatherSuccess,
    (state, { response }) => (response)
  ),
  on(fetchCurrentWeatherFailure,
    () => initialState
  )
);

export function weatherReducer(state, action) {
  return _weatherReducer(state, action);
}

export const currentWeatherSelector = (state: AppState) => state.current;

