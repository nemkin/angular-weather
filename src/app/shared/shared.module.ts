import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { WeatherService } from './services/weather-service/weather.service';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { ChartTemperaturePipe } from './pipes/chart-temperature.pipe';
import { WindWidgetComponent } from './components/wind-widget/wind-widget.component';
import { CityValidatorDirective } from './validators/city-validator.directive';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  declarations: [
    TemperaturePipe,
    ChartTemperaturePipe,
    WindWidgetComponent,
  ],
  exports: [
    CityValidatorDirective,
    TemperaturePipe,
    ChartTemperaturePipe,
    WindWidgetComponent,
  ],
  providers: [
    TemperaturePipe,
    ChartTemperaturePipe,
    WeatherService,
  ]
})
export class SharedModule { }
