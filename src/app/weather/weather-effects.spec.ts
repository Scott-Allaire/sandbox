import {WeatherEffects} from './weather-effects';
import {of, ReplaySubject} from 'rxjs';
import {Action, State, Store, StoreModule} from '@ngrx/store';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {CurrentConditions, WeatherService} from './weather.service';
import {FETCH_CURRENT_WEATHER_SUCCESS, fetchCurrentWeather, fetchCurrentWeatherFailure} from './weather-actions';
import {act} from '@ngrx/effects';


describe('weather-effects', () => {
  let effects: WeatherEffects;

  let actions: ReplaySubject<Action>;
  // @ts-ignore
  let store: Store<State>;

  const weatherService = jasmine.createSpyObj('weatherService', ['getCurrentConditions']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      providers: [
        WeatherEffects,
        provideMockActions(() => actions),
        {provide: WeatherService, useValue: weatherService}
      ]
    });

    effects = TestBed.get(WeatherEffects);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    actions = new ReplaySubject(2);
  });

  it('fetch current weather', () => {
    const conditions: CurrentConditions = {
      updated: '2020-09-18T21:59:00Z',
      timezone: 'UTC',
      conditions: 'partly clouded',
      temp_f: 72,
      humidity: 45
    };
    const action = fetchCurrentWeather();

    weatherService.getCurrentConditions.and.returnValue(of(conditions));

    actions.next(action);

    effects.fetchCurrentConditions$
      .subscribe((resultsAction) => {
        expect(resultsAction.type).toEqual(FETCH_CURRENT_WEATHER_SUCCESS);
        expect(resultsAction.response).toEqual(conditions);
      });

    expect(weatherService.getCurrentConditions).toHaveBeenCalled();
  });
});
