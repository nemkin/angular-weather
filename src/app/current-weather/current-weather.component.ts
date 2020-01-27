import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CurrentWeather } from '../current-weather';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit, OnChanges {

  @Input() city: string;
  currentWeather: CurrentWeather;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getCurrentWeather();
  }

  ngOnChanges() {
    this.getCurrentWeather();
  }

  getCurrentWeather(): void {
    this.weatherService.getCurrentWeather(this.city).subscribe(
      currentWeather => this.currentWeather = currentWeather
    );
  }

}
