import { Directive } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';
import { Observable, of } from 'rxjs';
import { ValidationErrors, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

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
