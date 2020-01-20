import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(temperature: number, fromUnit: string, toUnit: string) {

    if (temperature && !isNaN(temperature)) {

      if (fromUnit === toUnit) {
        return temperature;
      }

      const temperatureInCelsius = ((t) => {
        switch (fromUnit) {
          case 'K': return t - 273.15;
          case 'F': return 5 * (t - 32) / 9;
          case 'C': return t;
          default: throw Error(
            `Unknown temperature unit identifier '${fromUnit}'. Choose from 'K','F','C'.`
          );
        }
      })(temperature);

      return ((t) => {
        switch (toUnit) {
          case 'K': return t + 273.15;
          case 'F': return (9 * t) / 5 + 32;
          case 'C': return t;
          default: throw Error(
            `Unknown temperature unit identifier '${toUnit}'. Choose from 'K','F','C'.`
          );
        }
      })(temperatureInCelsius)
      .toFixed(0);
    }

    return null;
  }
}
