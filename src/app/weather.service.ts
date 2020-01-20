import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WeatherData } from './weather-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private url = 'https://api.openweathermap.org/data/2.5/weather?appid=881d45d0c0eafe81189f9b35bbbc818a&q=';
  constructor(
    private http: HttpClient,
  ) { }

  getWeatherData(city: string): Observable<WeatherData> {

    return this.http.get<any>(`${this.url}${city}`).pipe(
      map(
        result => {
          return {
            city: result.name,
            countryCode: result.sys.country,

            unixTime: result.dt,

            temperatureInKelvin: result.main.temp,
            pressureInHectoPascal: result.main.pressure,
            humidityPercent: result.main.humidity,
            windSpeedInMeterPerSecond: result.wind.speed,
            windDirectionInDegrees: result.wind.deg,

            cloudinessPercent: result.clouds.all,
          } as WeatherData;
        }
      )
    );
  }

}
