import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CurrentWeather } from '../current-weather';
import { ForecastWeather } from '../forecast-weather';
import { TemperaturePipe } from '../pipes/temperature.pipe';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit, OnChanges {

  @Input() city: string;
  currentWeather: CurrentWeather;
  forecastWeather: ForecastWeather;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getCurrentWeather();
    this.getForecastWeather();
  }

  ngOnChanges() {
    this.getCurrentWeather();
    this.getForecastWeather();
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
