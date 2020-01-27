import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ForecastWeather } from '../forecast-weather';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.scss']
})
export class ForecastWeatherComponent implements OnInit, OnChanges {

  @Input() city: string;
  forecastWeather: ForecastWeather[];



  view: any[] = [700, 300];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getForecastWeather();
  }

  ngOnChanges() {
    this.getForecastWeather();
  }

  getForecastWeather(): void {
    this.weatherService.getForecastWeather(this.city).subscribe(
      forecastWeather => {
        this.forecastWeather = [forecastWeather];
        console.log(forecastWeather);
    });
  }

}

