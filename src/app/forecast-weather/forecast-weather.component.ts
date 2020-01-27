import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ForecastWeather } from '../forecast-weather';
import { DatePipe } from '@angular/common';
import { TemperaturePipe } from '../pipes/temperature.pipe';

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

  view: any[] = [800, 300];

  legend = false;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Time';
  yAxisLabel = 'Temperature';
  timeline = false;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
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
      forecastWeather => {
        this.forecastWeather = [forecastWeather];
        console.log(forecastWeather);
    });
  }

}

