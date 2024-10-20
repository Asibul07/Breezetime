// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherApiUrl = 'http://api.weatherapi.com/v1/current.json'; // Weather API URL
  private apiKey = '6863677cdc074f6480d50916241710'; // Replace with your actual API key
  constructor(private http: HttpClient) {}

  getWeather(location: string): Observable<any> {
    const url = `${this.weatherApiUrl}?key=${this.apiKey}&q=${location}`;
    return this.http.get<any>(url);
  }
}
