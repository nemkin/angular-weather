import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CurrentWeather } from './current-weather';
import { ForecastWeather } from './forecast-weather';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private currentWeatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastWeatherBaseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private iconBaseUrl = 'http://openweathermap.org/img/wn/';
  private iconEndUrl = '@2x.png';

  constructor(
    private appConfig: AppConfigService,
    private http: HttpClient,
  ) { }

  getCurrentWeather(city: string): Observable<CurrentWeather> {

    return this.http.get<any>(`${this.currentWeatherBaseUrl}?appid=${this.appConfig.openWeatherApiKey}&q=${city}`).pipe(
      map(
        result => {
          return {
            city: result.name,
            countryCode: result.sys.country,
            unixTime: result.dt,

            description: result.weather[0].main,
            iconUrl: `${this.iconBaseUrl}${result.weather[0].icon}${this.iconEndUrl}`,

            temperatureInKelvin: result.main.temp,
            pressureInHectoPascal: result.main.pressure,
            humidityPercent: result.main.humidity,
            windSpeedInMeterPerSecond: result.wind.speed,
            windDirectionInDegrees: result.wind.deg,

            cloudinessPercent: result.clouds.all,
          } as CurrentWeather;
        }
      )
    );
  }

  getForecastWeather(city: string): Observable<ForecastWeather> {

    return this.http.get<any>(`${this.forecastWeatherBaseUrl}?appid=${this.appConfig.openWeatherApiKey}&q=${city}`).pipe(
      map(
        result => {
          return {
            city: result.city.name,
            countryCode: result.city.country,

            unixTime: result.list.map(item => item.dt),
            temperatureInKelvin: result.list.map(item => item.main.temp),
          } as ForecastWeather;
        }
      )
    );
  }
}
