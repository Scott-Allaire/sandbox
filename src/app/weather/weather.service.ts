import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseURI = environment.baseURI;

  constructor(
    private http: HttpClient,
  ) { }

  getCurrentConditions(): Observable<CurrentConditions> {
    return this.http.get<CurrentConditions>(`${this.baseURI}/current`);
  }
}

export interface CurrentConditions {
  updated?: string;
  timezone?: string;
  temp_f?: number;
  humidity?: number;
  conditions?: string;
}

