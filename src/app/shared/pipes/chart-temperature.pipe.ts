import { Pipe, PipeTransform } from '@angular/core';
import { TemperaturePipe } from './temperature.pipe';
import { ForecastWeather } from '../models/forecast-weather';

@Pipe({
  name: 'chartTemperature'
})
export class ChartTemperaturePipe implements PipeTransform {

  transform(forecastWeatherList: ForecastWeather[], fromUnit: string, toUnit: string): ForecastWeather[] {

    return forecastWeatherList.map(
      forecastWeather => ({
        name: forecastWeather.name,
        series: forecastWeather.series.map(
          item => ({
            name: item.name,
            value: new TemperaturePipe().transform(item.value, fromUnit, toUnit)
          })
        )
      })
    ) as ForecastWeather[];
  }

}

