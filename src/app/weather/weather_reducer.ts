import {CurrentConditions} from './weather.service';
import {on, createReducer, createSelector} from '@ngrx/store';
import {fetchCurrentWeatherSuccess} from './weather_actions';
import {AppState} from '../app.module';

export const initialState: CurrentConditions = {};

const _weatherReducer = createReducer(
  initialState,
  on(fetchCurrentWeatherSuccess,
    (state, { response }) => (response)
  ),
);

export function weatherReducer(state, action) {
  return _weatherReducer(state, action);
}

export const currentWeatherSelector = (state: AppState) => state.current;

