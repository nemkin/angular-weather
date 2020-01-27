import { Directive } from '@angular/core';
import { ValidationErrors, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WeatherService } from 'src/app/shared/services/weather-service/weather.service';

@Directive({
  selector: '[appCityValidator]'
})
export class CityValidatorDirective {

  constructor(private weatherService: WeatherService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.weatherService.isCityValid(control.value).pipe(
      map(result => {
        if (result) {
          return null;
        } else {
          return {cityValidator: `Can't find city ${control.value}`};
        }
      })
    );
  }

}
