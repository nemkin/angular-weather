import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ForecastWeather } from 'src/app/shared/models/forecast-weather';
import { WeatherService } from 'src/app/shared/services/weather-service/weather.service';
import { TemperaturePipe } from 'src/app/shared/pipes/temperature.pipe';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.scss']
})
export class ForecastWeatherComponent implements OnInit, OnChanges {

  constructor(
    private weatherService: WeatherService,
    public datePipe: DatePipe,
    public temperaturePipe: TemperaturePipe) { }

  @Input() city: string;
  forecastWeather: ForecastWeather[];

  xAxis = true;
  yAxis = true;

  xAxisLabel = 'Time';
  yAxisLabel = 'Temperature';

  colorScheme = {
    domain: ['#FFBF46']
  };

  xAxisTickFormatting = (unixTime: number) => this.datePipe.transform(unixTime * 1000, 'EE H:MM');
  yAxisTickFormatting = (temperatureInCelsius: number) => (`${temperatureInCelsius} C°`)

  ngOnInit() {
    this.getForecastWeather();
  }

  ngOnChanges() {
    this.getForecastWeather();
  }

  getForecastWeather(): void {
    this.weatherService.getForecastWeather(this.city).subscribe(
      data =>  this.forecastWeather = [data],
      _ => this.forecastWeather = null
    );
  }

}

