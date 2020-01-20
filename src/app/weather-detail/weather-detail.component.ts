import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherData } from '../weather-data';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {

  @Input() city: string;
  weatherData: WeatherData;

  temperaturePrediction = [10, 20, 30, 40, 50];
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeatherData();
    console.log(this.weatherData);
  }

  getWeatherData(): void {
    this.weatherService.getWeatherData(this.city).subscribe(
      weatherData => this.weatherData = weatherData
    );
  }

}
