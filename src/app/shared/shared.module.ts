import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { WindWidgetComponent } from './components/wind-widget/wind-widget.component';
import { WeatherService } from './services/weather-service/weather.service';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { ChartTemperaturePipe } from './pipes/chart-temperature.pipe';
import { CityValidatorDirective } from './validators/city-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
    WindWidgetComponent,
    CityValidatorDirective,
    TemperaturePipe,
    ChartTemperaturePipe,
  ],
  exports: [
    WindWidgetComponent,
    CityValidatorDirective,
    TemperaturePipe,
    ChartTemperaturePipe,
  ],
  providers: [
    TemperaturePipe,
    ChartTemperaturePipe,
    WeatherService,
  ]
})
export class SharedModule { }
