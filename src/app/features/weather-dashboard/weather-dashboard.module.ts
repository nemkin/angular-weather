import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { WeatherDashboardRoutingModule } from './weather-dashboard-routing.module';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastWeatherComponent } from './components/forecast-weather/forecast-weather.component';
import { AddCityDialogComponent } from './components/add-city-dialog/add-city-dialog.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';


@NgModule({
  declarations: [
    CurrentWeatherComponent,
    ForecastWeatherComponent,
    AddCityDialogComponent,
    DashboardPageComponent,
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule,

    CoreModule,
    MaterialModule,
    SharedModule,

    WeatherDashboardRoutingModule,
  ],
  exports: [
    DashboardPageComponent,
  ],
  providers: [
    DatePipe
  ],
  entryComponents: [
    AddCityDialogComponent,
  ]
})
export class WeatherDashboardModule { }
