import {initialState, weatherReducer} from './weather-reducer';
import {fetchCurrentWeatherFailure, fetchCurrentWeatherSuccess} from './weather-actions';


describe('tdd-event-reducer', () => {
  it('stores response to state on fetch success', () => {
    const response = {
      updated: '2020-09-18T21:59:00Z',
      timezone: 'UTC',
      conditions: 'partly clouded',
      temp_f: 72,
      humidity: 45
    };

    const reducedState = weatherReducer(initialState, fetchCurrentWeatherSuccess({response}));

    expect(reducedState.updated).toEqual(response.updated);
    expect(reducedState.timezone).toEqual(response.timezone);
    expect(reducedState.conditions).toEqual(response.conditions);
    expect(reducedState.temp_f).toEqual(response.temp_f);
    expect(reducedState.humidity).toEqual(response.humidity);
  });

  it('clears state on fetch failure', () => {
    const state = {
      updated: '2020-09-18T21:59:00Z',
      timezone: 'UTC',
      conditions: 'partly clouded',
      temp_f: 72,
      humidity: 45
    };

    const reducedState = weatherReducer(state, fetchCurrentWeatherFailure({message: 'some error'}));

    expect(reducedState).toEqual(initialState);
  });
});
