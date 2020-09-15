import { TestBed } from '@angular/core/testing';

import {CurrentConditions, WeatherService} from './weather.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {ReplaySubject} from 'rxjs';
import {environment} from '../../environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let actions: ReplaySubject<Action>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        WeatherService
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(WeatherService);
    actions = new ReplaySubject(2);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCurrentConditions() should fetch from server', () => {
    const expected: CurrentConditions = {
      updated: '2020-01-01T01:00:00Z',
      timezone: 'America/Chicago',
      temp_f: 65,
      humidity: 45,
      conditions: 'partly cloudy'
    };

    service.getCurrentConditions()
      .subscribe((current) => {
        expect(current).toEqual(expected);
      }, fail);

    const testRequest = httpTestingController
      .expectOne(`${environment.baseURI}/current`);

    testRequest.flush(expected);
  });
});
