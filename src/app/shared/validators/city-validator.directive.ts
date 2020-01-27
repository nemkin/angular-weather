import { Directive } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather-service/weather.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ValidationErrors, AbstractControl } from '@angular/forms';

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
