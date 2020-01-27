import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastWeatherComponent } from './components/forecast-weather/forecast-weather.component';
import { AddCityDialogComponent } from './components/add-city-dialog/add-city-dialog.component';

@NgModule({
  declarations: [
    CurrentWeatherComponent,
    ForecastWeatherComponent,
    AddCityDialogComponent,
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
    SharedModule,
  ],
  exports: [
    CurrentWeatherComponent,
    ForecastWeatherComponent,
  ],
  providers: [
    DatePipe
  ],
  entryComponents: [
    AddCityDialogComponent,
  ]
})
export class WeatherDashboardModule { }
