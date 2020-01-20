import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CurrentWeather } from '../current-weather';
import { ForecastWeather } from '../forecast-weather';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {

  @Input() city: string;
  currentWeather: CurrentWeather;
  forecastWeather: ForecastWeather;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getCurrentWeather();
    this.getForecastWeather();
    console.log(this.currentWeather);
    console.log(this.forecastWeather);
  }

  getCurrentWeather(): void {
    this.weatherService.getCurrentWeather(this.city).subscribe(
      currentWeather => this.currentWeather = currentWeather
    );
  }

  getForecastWeather(): void {
    this.weatherService.getForecastWeather(this.city).subscribe(
      forecastWeather => this.forecastWeather = forecastWeather
    );
  }

}
