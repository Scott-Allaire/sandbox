import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';
import {Store, StoreModule} from '@ngrx/store';
import * as fromWeather from './weather-reducer';
import {AppState} from '../app.module';
import {fetchCurrentWeather} from './weather-actions';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {WeatherService} from './weather.service';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let store: Store<AppState>;

  const weatherService = jasmine.createSpyObj('weatherService', ['getCurrentConditions']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          current: fromWeather.weatherReducer
        }),
      ],
      declarations: [
        WeatherComponent
      ],
      providers: [
        {provide: WeatherService, useValue: weatherService}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(fetchCurrentWeather());
  })
});
